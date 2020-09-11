'use strict';

// cache name of the cached files.
const smashIt = 'static-cache-v1';

// list of files or assets to cache.
const assets = [
    "/",
    "./index.html",
    "./styles.css",
    "./main.js",
    "./img/rain.webp",
    "./img/favicon/favicon-16x16.png",
    "./img/favicon/favicon-32x32.png",
    "./img/favicon/favicon.ico",
    "./img/logo/Smash It-logo-white.png",
]

// Cache all the files/assets to make a PWA
self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(smashIt).then(cache => {
            cache.addAll(assets)
        })
    )
})

// Fetch the assets
// Our service worker will intercept all fetch requests
// and check if we have cached the file
// if so it will serve the cached file
self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})