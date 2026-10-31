#!/usr/bin/env python3
"""Generate a service worker that precaches the exported web app."""

import hashlib
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
WORKER_PATH = DIST / "service-worker.js"


def main() -> None:
    files = sorted(
        path
        for path in DIST.rglob("*")
        if path.is_file() and path != WORKER_PATH
    )
    if not files:
        raise RuntimeError(f"No exported web files found in {DIST}")

    precache_urls = [
        f"./{path.relative_to(DIST).as_posix()}" for path in files
    ]
    version = hashlib.sha256()
    for path in files:
        version.update(path.relative_to(DIST).as_posix().encode("utf-8"))
        version.update(path.read_bytes())
    cache_name = f"subadapp-shell-{version.hexdigest()[:16]}"
    precache_json = json.dumps(precache_urls, ensure_ascii=False, separators=(",", ":"))

    WORKER_PATH.write_text(
        f"""const CACHE_NAME = "{cache_name}";
const PRECACHE_URLS = {precache_json};
const APP_SCOPE = self.registration.scope;
const CATALOG_URL = new URL("subadapp.json", APP_SCOPE).href;

self.addEventListener("install", (event) => {{
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        cache.addAll(
          PRECACHE_URLS.map(
            (url) => new Request(new URL(url, APP_SCOPE), {{ cache: "reload" }})
          )
        )
      )
      .then(() => self.skipWaiting())
  );
}});

self.addEventListener("activate", (event) => {{
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("subadapp-shell-") && key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
}});

async function networkFirst(request, cache) {{
  try {{
    const response = await fetch(request, {{ cache: "no-cache" }});
    if (response.ok) {{
      await cache.put(request, response.clone());
    }} else {{
      const cachedResponse = await cache.match(request);
      if (cachedResponse) return cachedResponse;
    }}
    return response;
  }} catch (error) {{
    const cachedResponse = await cache.match(request);
    if (cachedResponse) return cachedResponse;
    throw error;
  }}
}}

self.addEventListener("fetch", (event) => {{
  const request = event.request;
  const url = new URL(request.url);
  if (
    request.method !== "GET" ||
    url.origin !== self.location.origin ||
    !url.pathname.startsWith(new URL(APP_SCOPE).pathname)
  ) {{
    return;
  }}

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {{
      if (request.mode === "navigate" || url.href === CATALOG_URL) {{
        try {{
          const response = await networkFirst(request, cache);
          if (request.mode === "navigate" && !response.ok) {{
            return (await cache.match(new URL("index.html", APP_SCOPE))) || response;
          }}
          return response;
        }} catch (error) {{
          if (request.mode === "navigate") {{
            const appShell = await cache.match(new URL("index.html", APP_SCOPE));
            if (appShell) return appShell;
          }}
          throw error;
        }}
      }}

      const cachedResponse = await cache.match(request);
      if (cachedResponse) return cachedResponse;

      const response = await fetch(request);
      if (response.ok) await cache.put(request, response.clone());
      return response;
    }})
  );
}});
""",
        encoding="utf-8",
    )
    print(
        f"Generated {WORKER_PATH.relative_to(ROOT)} with {len(files)} precached files "
        f"({sum(path.stat().st_size for path in files):,} bytes)"
    )


if __name__ == "__main__":
    main()
