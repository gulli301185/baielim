import { IOrders } from '@/shared/types';
import { DocumentOrder } from '@/widgets';
import Close from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { PDFDownloadLink } from '@react-pdf/renderer';

type Props = {
  waybill: string;
  handleWaybill: () => void;
  orders: IOrders[];
  rowSelectionModel: GridRowSelectionModel;
};

const ConvertToPDF = ({
  waybill,
  handleWaybill,
  orders,
  rowSelectionModel,
}: Props) => {
  return (
    <Modal open={!!waybill} onClose={handleWaybill}>
      <div className='absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[40%] sm:w-full min-h-[200px] bg-[#FAFBFD] p-4 rounded-lg flex flex-col gap-6 outline-none'>
        <div className='w-full flex justify-between items-center'>
          <p className='text-lg text-[#333] font-semibold'>
            Экспорт заказов в PDF
          </p>
          <div onClick={handleWaybill} className='cursor-pointer'>
            <Close />
          </div>
        </div>
        <div className='w-full h-[100px] tp-center'>
          <div className='w-1/2 elim_button bg-blue-500 h-14 tp-center'>
            <PDFDownloadLink
              document={
                <DocumentOrder
                  rowSelectionModel={rowSelectionModel}
                  data={orders || []}
                  VAT={waybill === 'wVAT'}
                />
              }
              fileName='document.pdf'
            >
              {({ loading }) =>
                loading
                  ? 'Пожалуйста, подождите...'
                  : `Скачать PDF ${waybill === 'wVAT' ? '(НДС)' : ''}`
              }
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConvertToPDF;
