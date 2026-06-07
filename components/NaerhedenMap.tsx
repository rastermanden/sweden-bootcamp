'use client'
import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { NaerhedenFeature } from './NaerhedenSection'

const CAT_COLORS: Record<string, string> = {
  lejr:  '#1B4332',
  vand:  '#1565C0',
  natur: '#40916C',
  lokal: '#8B5E00',
}

function makeIcon(category: string, selected: boolean) {
  const color = CAT_COLORS[category] ?? '#1B4332'
  const size = selected ? 20 : 13
  const border = selected ? 3 : 2
  return L.divIcon({
    className: '',
    html: `<div style="
      width:${size}px;height:${size}px;
      background:${color};
      border:${border}px solid white;
      border-radius:50%;
      box-shadow:0 2px 8px rgba(0,0,0,.45);
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

function FlyTo({ lat, lng, zoom }: { lat: number; lng: number; zoom: number }) {
  const map = useMap()
  const prev = useRef<string>('')
  useEffect(() => {
    const key = `${lat},${lng}`
    if (key !== prev.current) {
      prev.current = key
      map.flyTo([lat, lng], zoom, { duration: 1.1, easeLinearity: 0.3 })
    }
  }, [lat, lng, zoom, map])
  return null
}

function ResetView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()
  const fired = useRef(false)
  useEffect(() => {
    if (!fired.current) { fired.current = true; return }
    map.flyTo(center, zoom, { duration: 1.0 })
  }, [center, zoom, map])
  return null
}

interface Props {
  features: NaerhedenFeature[]
  selectedId: string | null
  onSelect: (id: string) => void
  center: [number, number]
  zoom: number
}

export default function NaerhedenMap({ features, selectedId, onSelect, center, zoom }: Props) {
  const selected = features.find(f => f.id === selectedId)

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
      zoomControl
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        maxZoom={19}
      />

      {selected ? (
        <FlyTo
          lat={selected.geometry.coordinates[1]}
          lng={selected.geometry.coordinates[0]}
          zoom={14}
        />
      ) : (
        <ResetView center={center} zoom={zoom} />
      )}

      {features.map(feature => {
        const [lng, lat] = feature.geometry.coordinates
        const isSelected = feature.id === selectedId
        return (
          <Marker
            key={feature.id}
            position={[lat, lng]}
            icon={makeIcon(feature.properties.category, isSelected)}
            zIndexOffset={isSelected ? 1000 : 0}
            eventHandlers={{
              click: () => onSelect(feature.id),
            }}
          />
        )
      })}
    </MapContainer>
  )
}
