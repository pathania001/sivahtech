# Sivah Tech Homepage

Premium static SaaS-style homepage recreation for Sivah Tech.

## Open locally

Use any static file server from the project root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Structure

- `index.html` - complete homepage markup
- `assets/` - custom SVG brand, interface, project, and avatar assets
- `css/` - tokens, base styles, main imports, and responsive rules
- `components/` - reusable component styles and JS modules
- `effects/` - atmosphere, reveal, and depth-scene behavior
- `pages/` - homepage-specific composition CSS
- `js/` - frontend boot entrypoint

The exported package is `sivahtech-homepage.zip`.
