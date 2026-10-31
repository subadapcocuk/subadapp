import json
import posixpath
import zipfile
from pathlib import Path
from urllib.parse import quote, urlparse, urlsplit, urlunsplit
from xml.etree import ElementTree


ROOT = Path(__file__).resolve().parent.parent
INPUT_FILE = ROOT / "data" / "subadapp.xlsx"
OUTPUT_FILE = ROOT / "public" / "subadapp.json"
FALLBACK_IMAGE = "./subadapp-icon.png"

MAIN_NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
DOC_REL_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
PKG_REL_NS = "http://schemas.openxmlformats.org/package/2006/relationships"
NS = {"main": MAIN_NS}


def read_cell(cell, shared_strings):
    cell_type = cell.get("t")
    if cell_type == "inlineStr":
        return "".join(text.text or "" for text in cell.findall(".//main:t", NS)).strip()

    value = cell.find("main:v", NS)
    if value is None:
        return ""
    if cell_type == "s":
        return shared_strings[int(value.text)].strip()

    return (value.text or "").strip()


def read_sheet(archive, sheet_path, shared_strings):
    root = ElementTree.fromstring(archive.read(sheet_path))
    rows = []
    for row in root.findall(".//main:sheetData/main:row", NS):
        values = {}
        for cell in row.findall("main:c", NS):
            column = 0
            for character in "".join(
                char for char in cell.get("r", "") if char.isalpha()
            ):
                column = column * 26 + ord(character.upper()) - ord("A") + 1
            values[column - 1] = read_cell(cell, shared_strings)
        if values:
            rows.append(values)

    if not rows:
        return []

    headers = [rows[0].get(index, "") for index in range(max(rows[0]) + 1)]
    return [
        {
            header: convert_value(header, row.get(index, ""))
            for index, header in enumerate(headers)
            if header and row.get(index, "") != ""
        }
        for row in rows[1:]
        if any(value != "" for value in row.values())
    ]


def convert_value(header, value):
    if header in {"page", "url", "image"}:
        return normalize_url(value)
    if header not in {"no", "albumNo", "year"}:
        return value

    number = float(value)
    return int(number) if number.is_integer() else number


def normalize_url(value):
    parts = urlsplit(value)
    path = quote(parts.path, safe="/%:@$&'()*+,;=-._~%")
    return urlunsplit(parts._replace(path=path))


def is_image_url(value):
    path = urlparse(value).path.lower()
    return "/index.php/" not in path and path.endswith(
        (".png", ".jpg", ".jpeg", ".gif", ".webp")
    )


def export_catalog():
    with zipfile.ZipFile(INPUT_FILE) as archive:
        workbook = ElementTree.fromstring(archive.read("xl/workbook.xml"))
        relationships = ElementTree.fromstring(
            archive.read("xl/_rels/workbook.xml.rels")
        )
        targets = {
            relationship.get("Id"): relationship.get("Target")
            for relationship in relationships.findall(
                f"{{{PKG_REL_NS}}}Relationship"
            )
        }

        shared_strings = []
        if "xl/sharedStrings.xml" in archive.namelist():
            strings_root = ElementTree.fromstring(
                archive.read("xl/sharedStrings.xml")
            )
            shared_strings = [
                "".join(text.text or "" for text in item.findall(".//main:t", NS))
                for item in strings_root.findall("main:si", NS)
            ]

        sheets = {}
        for sheet in workbook.findall("main:sheets/main:sheet", NS):
            relation_id = sheet.get(f"{{{DOC_REL_NS}}}id")
            target = targets[relation_id]
            sheet_path = (
                target.lstrip("/")
                if target.startswith("/")
                else posixpath.normpath(posixpath.join("xl", target))
            )
            sheets[sheet.get("name")] = read_sheet(
                archive, sheet_path, shared_strings
            )

    if "albums" not in sheets or "songs" not in sheets:
        raise ValueError("Workbook must contain 'albums' and 'songs' sheets")

    albums = [
        {key: album[key] for key in ("no", "name", "year", "page", "image")}
        for album in sheets["albums"]
    ]
    for album in albums:
        if not is_image_url(album["image"]):
            print(
                f"Warning: album {album['no']} ({album['name']}) has no direct image; "
                f"using the app icon"
            )
            album["image"] = FALLBACK_IMAGE

    albums_by_number = {album["no"]: album for album in albums}
    songs = []
    for row in sheets["songs"]:
        song = {
            key: row[key]
            for key in ("no", "albumNo", "name", "page", "url", "image")
        }
        if not is_image_url(song["image"]):
            album = albums_by_number[song["albumNo"]]
            fallback_label = (
                "app icon" if album["image"] == FALLBACK_IMAGE else "album artwork"
            )
            print(
                f"Warning: song {song['no']} ({song['name']}) has no direct image; "
                f"using {fallback_label}"
            )
            song["image"] = album["image"]
        songs.append(song)

    if not albums or not songs:
        raise ValueError("Workbook must contain at least one album and one song")

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(
        json.dumps(
            {"albums": albums, "songs": songs, "highlights": []},
            ensure_ascii=False,
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    print(f"Exported {len(albums)} albums and {len(songs)} songs to {OUTPUT_FILE}")


if __name__ == "__main__":
    export_catalog()
