import { IOrders } from '@/shared/types';
import { toastError } from '@/shared/utils/helpers/toastify';
import Modal from '@mui/material/Modal';
import Close from '@mui/icons-material/Close';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

type Props = {
  map: boolean;
  handleMap: () => void;
  orders: IOrders[];
};

const MapCoordinates = ({ map, handleMap, orders }: Props) => {
  const captureRef = useRef<HTMLDivElement>(null);

  const handlePrintClick = async () => {
    try {
      if (captureRef.current) {
        const canvas = await html2canvas(captureRef.current, {
          allowTaint: false,
          useCORS: true,
        });
        const dataURL = canvas.toDataURL('image/png');

        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(`<img src="${dataURL}" />`);
          printWindow.document.close();
          printWindow.print();
        }
      }
    } catch (error: any) {
      toastError(
        error.message ||
          'Возникла ошибка при создании или печати скриншота. Пожалуйста, повторите попытку позже.'
      );
    }
  };

  return (
    <Modal open={map} onClose={handleMap}>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[97%] sm:w-full h-[95%] bg-[#FAFBFD] p-4 rounded-lg flex flex-col gap-4 outline-none'>
        <div className='w-full flex justify-between items-center'>
          <p className='text-lg text-[#333] font-semibold'>Карта магазинов</p>
          <div className='h-full flex items-center gap-6'>
            <button
              onClick={(e) => {
                e.preventDefault();
                handlePrintClick();
              }}
              className='border w-full text-center px-3 py-2 text-xs lg:text-base rounded-md bg-blue-500 text-white'
            >
              Распечатать
            </button>
            <div onClick={handleMap} className='cursor-pointer'>
              <Close />
            </div>
          </div>
        </div>
        <div className='w-full h-full' ref={captureRef}>
          <MapContainer
            center={[42.86, 74.6]}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {orders.map((order) => (
              <Marker
                key={order.id}
                //@ts-ignore
                position={[order?.store?.lat, order?.store?.lon]}
              >
                <Popup>{order.store?.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </Modal>
  );
};

export default MapCoordinates;
