import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';
import type {
    coordinatesTypes,
    MapServiceTypes
} from 'types/index'

export default function MapService({ mapContainer, coordinates }: MapServiceTypes) {
    const map = new maplibregl.Map({
        container: mapContainer,
        style: 'https://demotiles.maplibre.org/style.json',
        center: [coordinates.latitude, coordinates.longitude],
        zoom: 5
    });
    const marker = new maplibregl.Marker()
        .setLngLat([coordinates.latitude, coordinates.longitude])
        .addTo(map)


    map.on('load', () => {
        map.addSource('geojson-source', {
            type: 'geojson',
            data: 'data.geojson',
        });

        map.addLayer({
            id: 'geojson-layer',
            type: 'fill',
            source: 'geojson-source',
            paint: {
                'fill-color': '#0080ff',
                'fill-opacity': 0.5,
            },
        });
    });

    map.on('load', function () {
        map.addSource('osm', {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256
        });

        map.addLayer({
            id: 'osm-layer',
            type: 'raster',
            source: 'osm',
        });
    });
}