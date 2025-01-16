import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import IconShop from '@/shared/assets/icon-shop.png';
import IconOrder from '@/shared/assets/icon-order.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
});

type Props = {
  label: string;
  orderID?: number;
  storeName?: string;
  lat?: number;
  lon?: number;
  orderLat?: number;
  orderLon?: number;
};

L.Marker.prototype.options.icon = DefaultIcon;

const iconShop = L.icon({
  iconUrl: IconShop,
  iconSize: [40, 40],
});
const iconOrder = L.icon({
  iconUrl: IconOrder,
  iconSize: [40, 40],
});

const Map = ({
  label,
  orderID,
  storeName,
  lat,
  lon,
  orderLat,
  orderLon,
}: Props) => {
  return (
    <div className='w-full h-full'>
      <p className='mb-2 text-lg font-medium'>{label}:</p>
      <div className='w-full h-[600px]'>
        <MapContainer
          center={[42.86, 74.6]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {lat && lon && (
            <Marker position={[lat, lon]} icon={iconShop}>
              {storeName && <Popup>Название: {storeName}</Popup>}
            </Marker>
          )}
          {orderLat && orderLon && (
            <Marker position={[orderLat, orderLon]} icon={iconOrder}>
              {orderID && <Popup>ID заказа: {orderID}</Popup>}
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
