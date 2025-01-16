import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';

import Routing from '@/features/MapStore/model/Routing';
import { Error, Loader } from '@/widgets';
import SearchFilter from '@/widgets/SearchFilter';
import IconAgent from '@/shared/assets/driver.png';
import useMapService from '../../model/useMapService';

let DefaultIcon = L.icon({
  iconUrl: IconAgent,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapAgent = () => {
  const {
    mapRef,
    agents,
    status,
    control,
    onSubmit,
    wayPoints,
    handleSubmit,
    handleResetFields,
  } = useMapService();

  if (status === 'loading') return <Loader />;
  if (status === 'error') return <Error />;

  return (
    <div className='flex flex-col w-full h-full'>
      <SearchFilter
        control={control}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        handleResetFields={handleResetFields}
        filters={{
          agent: true,
          store: false,
          start_date: false,
          end_date: false,
          date: true,
        }}
      />
      <div className='w-full min-h-[calc(100vh_-_100px)]'>
        {wayPoints?.length ? (
          <MapContainer
            center={[42.86, 74.6]}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            <Routing latLng={wayPoints} />
          </MapContainer>
        ) : (
          <MapContainer
            center={[42.86, 74.6]}
            zoom={12}
            ref={(mapInstance) => {
              if (mapInstance) {
                mapRef.current = mapInstance;
              }
            }}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <MarkerClusterGroup>
              {agents.map((agent: any) => (
                <Marker key={agent.id} position={[agent.lat, agent.lon]}>
                  <Popup>{agent.name}</Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default MapAgent;
