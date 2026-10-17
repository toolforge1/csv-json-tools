const CACHE_NAME = "csv-json-tools-v7";
const BASE = new URL("./", self.location.href);
const SHELL = [
  "./",
  "./index.html",
  "./about.html",
  "./contact.html",
  "./privacy-policy.html",
  "./cookie-policy.html",
  "./terms.html",
  "./base64-to-json.html",
  "./csv-to-html.html",
  "./csv-to-json.html",
  "./csv-to-jsonl.html",
  "./csv-to-markdown.html",
  "./csv-to-sql.html",
  "./csv-to-tsv.html",
  "./csv-to-xml.html",
  "./csv-viewer.html",
  "./excel-to-json.html",
  "./json-diff-compare.html",
  "./json-formatter.html",
  "./json-to-typescript.html",
  "./json-schema-generator.html",
  "./json-to-base64.html",
  "./json-to-csv.html",
  "./json-to-html.html",
  "./json-to-jsonl.html",
  "./json-to-markdown.html",
  "./json-to-sql.html",
  "./json-to-text.html",
  "./json-to-toml.html",
  "./json-to-tsv.html",
  "./json-to-url-encoder.html",
  "./json-to-xml.html",
  "./json-to-yaml.html",
  "./json-url-decoder.html",
  "./jsonl-to-json.html",
  "./text-to-json.html",
  "./toml-to-json.html",
  "./tsv-to-csv.html",
  "./tsv-to-json.html",
  "./xml-to-json.html",
  "./yaml-to-json.html",
  "./offline.html",
  "./manifest.json",
  "./icon.svg",
  "./assets/tool-pages.css",
  "./assets/csv-utils.js",
  "./assets/theme.js"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.all(SHELL.map(async path => {
      try {
        const url = new URL(path, BASE);
        const response = await fetch(url, { cache: "reload" });
        if (response.ok) await cache.put(url, response);
      } catch (_) {
        // Keep installation available even if one optional resource fails.
      }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith("csv-json-tools-") && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, response.clone()).catch(() => {});
        }
        return response;
      } catch (_) {
        const cache = await caches.open(CACHE_NAME);
        return (await cache.match(request)) || (await cache.match(new URL("./offline.html", BASE)));
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok) cache.put(request, response.clone()).catch(() => {});
      return response;
    } catch (_) {
      return cached || Response.error();
    }
  })());
});