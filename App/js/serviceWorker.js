const staticDevVirtual = "dev-virtual-on"
const assets = [
    "/",
    "/index.html",
    "/style.css",
    "/app.js",
    "/images/logo1.png",
    "/images/logo_canary.png",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticDevVirtual).then(cache => {
            cache.addAll(assets)
        })
    )
})