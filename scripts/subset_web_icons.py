#!/usr/bin/env python3
"""Subset the FontAwesome fonts in Expo's web export to icons used by the app."""

import json
import hashlib
import sys
import tempfile
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont


ROOT = Path(__file__).resolve().parents[1]
ICON_NAMES = {
    "arrow-down-a-z",
    "backward",
    "bars",
    "book",
    "bookmark",
    "calendar-days",
    "creative-commons-nc",
    "envelope",
    "facebook",
    "folder-open",
    "forward",
    "hand-holding-dollar",
    "instagram",
    "minus",
    "mobile-screen-button",
    "music",
    "pause",
    "play",
    "plus",
    "question",
    "repeat",
    "rotate-right",
    "share",
    "trash",
    "twitter",
    "user-shield",
    "youtube",
}
FONT_FILES = {
    "brands": "FontAwesome6_Brands.ttf",
    "regular": "FontAwesome6_Regular.ttf",
    "solid": "FontAwesome6_Solid.ttf",
}


def find_single_file(directory: Path, filename: str) -> Path:
    matches = list(directory.rglob(f"{Path(filename).stem}.*.ttf"))
    if len(matches) != 1:
        raise RuntimeError(f"Expected one {filename} in {directory}, found {len(matches)}")
    return matches[0]


def main() -> None:
    package_dir = ROOT / "node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons"
    glyph_map_path = package_dir / "glyphmaps/FontAwesome6Free.json"
    metadata_path = package_dir / "glyphmaps/FontAwesome6Free_meta.json"
    try:
        glyph_map = json.loads(glyph_map_path.read_text(encoding="utf-8"))
        metadata = json.loads(metadata_path.read_text(encoding="utf-8"))
        source_font_dir = ROOT / "dist/assets"

        styles = {name: set() for name in FONT_FILES}
        for icon_name in ICON_NAMES:
            if icon_name not in glyph_map:
                raise RuntimeError(f"Unknown FontAwesome icon: {icon_name}")
            family = next(
                (style for style in ("brands", "regular", "solid") if icon_name in metadata[style]),
                None,
            )
            if family is None:
                raise RuntimeError(f"No FontAwesome style found for {icon_name}")
            styles[family].add(glyph_map[icon_name])

        sizes_before = 0
        sizes_after = 0
        font_replacements = {}
        for style, filename in FONT_FILES.items():
            path = find_single_file(source_font_dir, filename)
            original_name = path.name
            sizes_before += path.stat().st_size
            font = TTFont(path)
            options = subset.Options()
            options.name_IDs = [0, 1, 2, 3, 4, 5, 6]
            options.name_legacy = True
            options.name_languages = ["*"]
            options.layout_features = ["*"]
            subsetter = subset.Subsetter(options=options)
            subsetter.populate(unicodes=styles[style])
            subsetter.subset(font)

            with tempfile.NamedTemporaryFile(dir=path.parent, suffix=".ttf", delete=False) as temporary:
                temp_path = Path(temporary.name)
            try:
                font.save(temp_path)
                temp_path.replace(path)
            finally:
                temp_path.unlink(missing_ok=True)
            subset_name = f"{path.stem.rsplit('.', 1)[0]}.{hashlib.md5(path.read_bytes()).hexdigest()}.ttf"
            subset_path = path.with_name(subset_name)
            path.replace(subset_path)
            font_replacements[original_name] = subset_name
            sizes_after += subset_path.stat().st_size

        js_dir = ROOT / "dist/_expo/static/js/web"
        bundles = list(js_dir.glob("AppEntry-*.js"))
        if len(bundles) != 1:
            raise RuntimeError(f"Expected one web JavaScript bundle, found {len(bundles)}")
        bundle_path = bundles[0]
        bundle = bundle_path.read_text(encoding="utf-8")
        for original_name, subset_name in font_replacements.items():
            if original_name not in bundle:
                raise RuntimeError(f"Font asset reference not found in {bundle_path}: {original_name}")
            bundle = bundle.replace(original_name, subset_name)
        bundle_path.write_text(bundle, encoding="utf-8")
        hashed_bundle = f"AppEntry-{hashlib.md5(bundle_path.read_bytes()).hexdigest()}.js"
        hashed_bundle_path = bundle_path.with_name(hashed_bundle)
        bundle_path.replace(hashed_bundle_path)

        index_path = ROOT / "dist/index.html"
        index = index_path.read_text(encoding="utf-8")
        if bundle_path.name not in index:
            raise RuntimeError(f"Bundle reference not found in {index_path}: {bundle_path.name}")
        index_path.write_text(index.replace(bundle_path.name, hashed_bundle), encoding="utf-8")

        saved = sizes_before - sizes_after
        percentage = (saved / sizes_before * 100) if sizes_before else 0
        print(
            f"Subset FontAwesome web fonts: {sizes_before:,} -> {sizes_after:,} bytes "
            f"({saved:,} bytes, {percentage:.1f}% smaller)"
        )
    except ModuleNotFoundError as error:
        print(
            "Font subsetting requires fontTools. Install it with "
            "`python3 -m pip install -r requirements-web.txt`.",
            file=sys.stderr,
        )
        raise error


if __name__ == "__main__":
    main()
