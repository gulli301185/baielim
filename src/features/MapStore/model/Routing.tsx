import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { Marker, Polyline, Popup, useMap } from 'react-leaflet';
import pointAIcon from '../../../shared/assets/pointA.png';
import pointBIcon from '../../../shared/assets/pointB.png';

export default function Routing({ latLng }: { latLng: any }) {
  L.Marker.prototype.options.icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [14, 20],
  });
  const map = useMap();

  const pointStart = latLng[0];
  const pointEnd = latLng[latLng.length - 1];

  useEffect(() => {
    const bounds = L.latLngBounds(
      latLng.length
        ? latLng.map((point: any) => [point.lat, point.lon])
        : [[42.882004, 74.582748]]
    );

    map.fitBounds(bounds);
  }, [map, latLng]);

  const iconPointA = L.icon({
    iconUrl: pointAIcon,
    iconSize: [30, 30],
  });
  const iconPointB = L.icon({
    iconUrl: pointBIcon,
    iconSize: [30, 30],
  });

  return (
    <>
      <Marker
        position={[pointStart.lat, pointStart.lon]}
        icon={iconPointA}
        zIndexOffset={1000}
      >
        <Popup>{pointStart.date}</Popup>
      </Marker>
      <Marker
        position={[pointEnd.lat, pointEnd.lon]}
        icon={iconPointB}
        zIndexOffset={1000}
      >
        <Popup>{pointEnd.date}</Popup>
      </Marker>
      {latLng.map((lt: any, idx: number) => (
        <Marker key={idx} position={[lt.lat, lt.lon]}>
          <Popup>{lt.date}</Popup>
        </Marker>
      ))}
      <Polyline positions={latLng} pathOptions={{ color: 'red', weight: 1 }} />
    </>
  );
}
