import { db } from '@/app/firebase';
import { IDeletionRequest, Status } from '@/shared/types';
import { toastError } from '@/shared/utils/helpers/toastify';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useDeletionRequestService = () => {
  const [requests, setRequests] = useState<IDeletionRequest[]>([]);
  const [status, setStatus] = useState<Status>('initial');
  const [reqID, setReqID] = useState('');

  const getDeletionRequests = async () => {
    setStatus('loading');

    try {
      const requestSnapshot = await getDocs(collection(db, 'deletion_req'));
      const result = requestSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRequests(result as IDeletionRequest[]);
      setStatus('success');
    } catch (error: any) {
      setStatus('error');
      toastError('Возникла ошибка. Пожалуйста, повторите попытку позже');
    }
  };

  const handleDeleteRequest = async () => {
    setStatus('loading');

    try {
      await deleteDoc(doc(db, `deletion_req/${reqID}`));
      const filteredRequests = requests.filter((req) => req.id !== reqID);
      setRequests(filteredRequests);

      setStatus('success');
    } catch (error) {
      setStatus('error');
      toastError('Возникла ошибка. Пожалуйста, повторите попытку позже');
    }
  };

  const handleDeleteConfirmModal = (value: string) => {
    setReqID(value);
  };

  useEffect(() => {
    getDeletionRequests();
  }, []);

  return {
    reqID,
    status,
    requests,
    handleDeleteRequest,
    handleDeleteConfirmModal,
  };
};

export default useDeletionRequestService;
