import { Error, Loader } from '@/widgets';
import useMapStoreService from '../../model/useMapStoreService';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapStore = () => {
  const { allData, loading, error } = useMapStoreService();

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <MapContainer
      center={[42.86, 74.6]}
      zoom={12}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <MarkerClusterGroup>
        {allData.map((pos) => (
          <Marker key={pos.id} position={[pos.lat, pos.lon]}>
            <Popup>{pos.name}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default MapStore;
