# Creatividades para anuncios

`ad-800x800.html` es la fuente. Para exportarla a PNG (se renderiza al doble y se reduce, para que quede nítida):

```bash
cd marketing/ads
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars \
  --force-device-scale-factor=2 --window-size=800,800 \
  --screenshot="$PWD/ad@2x.png" "file://$PWD/ad-800x800.html"
sips -z 800 800 ad@2x.png --out ad-800x800.png && rm ad@2x.png
```

El precio del anuncio debe coincidir con el de la landing (`PRICES` en `src/content/services.js`).
