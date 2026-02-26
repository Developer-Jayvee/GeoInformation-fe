import { useEffect, useRef, useState } from 'react';
import MapService from 'services/mapService';
import type {
    coordinatesTypes,
    MapTypes
} from 'types/index'
export default function MapContainer({ latitude = 0, longitude = 0, handleCoordinates }: MapTypes) {
    const mapContainer = useRef(null);
    const mapInstance = useRef(null);
    const [currentMap, setCurrentMap] = useState(null);
    useEffect(() => {
        const resetCoordinates = () => {
            handleCoordinates('0', 'latitude');
            handleCoordinates('0', 'longitude');
        }
        try {
            MapService({ mapContainer : mapContainer.current , coordinates : { latitude : latitude , longitude : longitude }});
        } catch (error) {
            alert('Invalid coordinates');
            resetCoordinates()
        }
    }, [latitude, longitude]);
    return (
        <div className='map-container'
            ref={mapContainer}
            style={{ width: '100%', height:'100%' }}
        />
    );
}