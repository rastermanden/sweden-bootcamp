# Add Map Feature

Add a new attraction to the Nærheden map (`data/naerheden.geojson`).

## Usage

```
/add-map-feature <url> [lat,lon]
```

- `url` — a page with information about the attraction
- `lat,lon` (optional) — explicit coordinates if the page doesn't have them or if more precise ones are available

## Steps

1. **Fetch the page** using WebFetch on the provided URL. If it returns 403 or fails, fall back to WebSearch using the location name extracted from the URL slug.

2. **Extract** the following from the page or search results:
   - Full name (local/Swedish)
   - Description, activities, facilities, access information
   - Coordinates — use the explicitly provided `lat,lon` if given, otherwise extract from the page. Coordinates in GeoJSON are **[longitude, latitude]** order.
   - Best months to visit
   - Any links worth including (official page, map link)

3. **Classify** the feature:
   - `category`: `vand` (lakes, rivers, swimming, kayaking, fishing, sauna), `natur` (forests, trails, hiking, wildlife, nature reserves), `lokal` (villages, farms, markets, cultural sites)
   - `difficulty`: `let`, `let-moderat`, `moderat`, or `kraevende` — based on physical demand
   - `distance`: straight-line or road distance from the camp at Lidhult (~56.820°N, 13.717°E)
   - `duration`: realistic visit time
   - `bestMonths`: array of month numbers (1–12)
   - `included`: always `false` for external attractions

4. **Write all text fields in Danish** (name, nameShort, tagline, description, details). Translate from Swedish/English as needed. Keep the voice warm and active — match the tone of existing entries.

5. **Build the GeoJSON feature** following this exact schema:

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
    "duration": "X timer / Halv dag",
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
        "label": "Officiel side",
        "url": "source url"
      }
    ]
  }
}
```

6. **Read** `data/naerheden.geojson`, append the new feature to the `features` array before the closing `]`, and update `metadata.lastUpdated` to today's date.

7. **Show** the final JSON of the added feature to the user for review before finishing.

## Category icons

| Category | Typical icons |
|----------|--------------|
| `vand`   | 🌊 🚣 🏊 🎣 🧖 ⛵ |
| `natur`  | 🌲 🥾 🦌 🏕️ 🌿 🗺️ |
| `lokal`  | 🌾 🏘️ 🛖 🍓 🏛️ |
