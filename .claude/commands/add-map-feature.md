# Add Map Feature

Add a new attraction to the Nærheden map (`data/naerheden.geojson`).

## Usage

```
/add-map-feature <url> [lat,lon]
```

- `url` — a page with information about the attraction (Naturkartan, Länsstyrelsen, AllTrails, etc.)
- `lat,lon` (optional) — explicit coordinates if the page doesn't have them or if you have more precise ones

## Step 1 — Get page content and coordinates

Try **WebFetch** on the URL. Swedish authority sites and trail platforms commonly return HTTP 403 — this includes Länsstyrelsen, Naturkartan, and AllTrails. If that happens, **WebSearch** the location name extracted from the URL slug to get descriptive info.

**Coordinates are required — never guess or estimate them.** Use this priority order:

1. **Google Maps URL provided as second argument** — extract `LAT,LON` from patterns like:
   - `destination=LAT,LON`
   - `maps.google.com/maps?q=LAT,LON`
   - `google.com/maps/place/LAT,LON/@...`
   - `google.com/maps/place/@LAT,LON,ZOOMz`
   - Note: Google Maps uses `lat,lon` order. GeoJSON coordinates are `[longitude, latitude]` — swap them.
   - **`maps.app.goo.gl` short URLs cannot be expanded** — ask the user to open the link in their browser and copy the full URL from the address bar.
   - **Multiple `!3d`/`!4d` pairs in the data segment** — Google Maps URLs sometimes contain several lat/lon pairs (e.g. one for the search origin, one for the pin). Always use the pair whose values are closest to the `@LAT,LON` viewport anchor that appears right after `/place/` — that is the place pin.

2. **Fetched page contains a Google Maps link** — extract coordinates from it as above.

3. **No coordinates available** — stop and ask the user:
   > "I couldn't find coordinates for this location. Please open the Naturkartan or Länsstyrelsen page, click the **'Hitta hit'** (Find here) button, copy the Google Maps URL, and paste it here."

Never proceed with guessed, estimated, or approximate coordinates.

## Step 2 — Extract information

- Full name (local/Swedish)
- Description, activities, facilities, access information
- Coordinates (from Google Maps link, page content, or provided `lat,lon`)
- Best months to visit
- Source URL to include as an info link

## Step 3 — Classify

- `category`: `vand` (lakes, rivers, swimming, kayaking, fishing, sauna), `natur` (forests, trails, hiking, wildlife, nature reserves), `lokal` (villages, farms, markets, cultural sites)
- `difficulty`: `let`, `let-moderat`, `moderat`, or `kraevende`
- `distance`: straight-line distance from the camp at Lidhult (56.8297°N, 13.5473°E / Loshult 7, Lidhult). Always measure from the camp — ignore sourced road distances that quote a different origin (e.g. "X km from town centre"). If the feature falls outside the current map bounding box ([13.30–14.10°E, 56.60–57.10°N]), note this clearly.
- `duration`: realistic visit time
- `bestMonths`: array of month numbers (1–12)
- `included`: always `false` for external attractions

## Step 4 — Write in Danish

All text fields (name, nameShort, tagline, description, details) must be in Danish. Translate from Swedish/English as needed. Match the warm, active voice of existing entries.

## Step 5 — Build the GeoJSON feature

```json
{
  "type": "Feature",
  "id": "kebab-case-id",
  "geometry": {
    "type": "Point",
    "coordinates": [longitude, latitude]
  },
  "properties": {
    "name": "Full Danish name",
    "nameShort": "Short label",
    "category": "vand|natur|lokal",
    "icon": "relevant emoji",
    "tagline": "One evocative sentence",
    "description": "2–3 sentences, key facts and appeal",
    "details": "3–5 sentences, practical details, tips, what to bring",
    "address": "Location, County, Sverige",
    "distance": "X km",
    "duration": "X timer / Halv dag / Flerdag",
    "difficulty": "let|let-moderat|moderat|kraevende",
    "bestMonths": [5, 6, 7, 8, 9],
    "included": false,
    "images": [
      {
        "url": "https://images.unsplash.com/photo-XXXXXXXXXX?w=800&h=600&fit=crop&q=80",
        "alt": "Danish alt text describing the scene",
        "credit": "Unsplash",
        "isPrimary": true
      }
    ],
    "links": [
      {
        "label": "Åbn i OpenStreetMap",
        "url": "https://www.openstreetmap.org/#map=14/lat/lon"
      },
      {
        "label": "Naturkartan",
        "url": "source naturkartan url"
      },
      {
        "label": "Officiel side",
        "url": "other source url if available"
      }
    ]
  }
}
```

Always include the source URL (Naturkartan, Länsstyrelsen, etc.) as a `links` entry so users can find more information.

## Step 6 — Update the GeoJSON

Read `data/naerheden.geojson`, append the new feature to the `features` array, and update `metadata.lastUpdated` to today's date — skip the edit if it is already today's date.

## Step 7 — Show result

Show the final JSON of the added feature to the user for review.

## Category icons

| Category | Typical icons |
|----------|--------------|
| `vand`   | 🌊 🚣 🏊 🎣 🧖 ⛵ |
| `natur`  | 🌲 🥾 🦌 🏕️ 🌿 🗺️ |
| `lokal`  | 🌾 🏘️ 🛖 🍓 🏛️ |
