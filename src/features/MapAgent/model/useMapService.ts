import { db } from '@/app/firebase';
import { Status } from '@/shared/types';
import { toastError, toastInfo } from '@/shared/utils/helpers/toastify';
import dayjs from 'dayjs';
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

interface Agent {
  id: string;
  name: string;
  lat?: number;
  lon?: number;
}

interface ILatLon {
  lat: number;
  lon: number;
}

type Props = {
  agent: number | string;
  date: string;
};

const useMapService = () => {
  const mapRef = useRef<L.Map | null>(null);
  const [wayPoints, setWayPoints] = useState<ILatLon[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [status, setStatus] = useState<Status>('initial');

  const { handleSubmit, reset, control, getValues } = useForm();

  const value = getValues();

  const onSubmit: SubmitHandler<FieldValues> = async ({
    agent,
    date,
  }: FieldValues) => {
    if (!agent.id || !date) return;

    fetchData({
      agent: agent?.id,
      date,
    });
  };

  const fetchData = async ({ agent, date }: Props) => {
    setStatus('loading');

    try {
      const agentRef = query(
        collection(db, `agents/${agent}/locations/${date}/bydate`),
        orderBy('date')
      );

      const querySnapshot = await getDocs(agentRef);

      const points = querySnapshot.docs.map((el) => {
        const totalMilliseconds =
          el.data().date.seconds * 1000 + el.data().date.nanoseconds / 1e6;
        const date = dayjs(totalMilliseconds).format('HH:mm');
        return {
          lat: el.data()?.lat,
          lon: el.data()?.lon,
          date,
        };
      });

      if (!points.length) {
        toastInfo('Ничего не найдено');
      }

      setWayPoints(points);
      setStatus('success');
    } catch (error: any) {
      setStatus('error');
      toastError(error.message || 'Произошла ошибка при получении данных!');
    }
  };

  const handleResetFields = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    reset({
      agent: { label: '', id: '' },
      date: '',
    });
    setWayPoints([]);
    if (mapRef.current) {
      const map = mapRef.current;
      map.setView([42.86, 74.6], 12); // Устанавливаем центр и зум (12 — новый уровень зума)
    }
  };

  useEffect(() => {
    if (value?.agent?.name || value?.date) {
      // Если выбраны агент и дата, не подписываемся на обновления
      return;
    }

    setStatus('loading');

    const agentsCollection = collection(db, 'agents');

    const unsubscribe = onSnapshot(
      agentsCollection,
      (agentSnapshot) => {
        const res = agentSnapshot.docs
          .map((doc) => {
            const agentData = doc.data();
            if (agentData.lat && agentData.lon) {
              return {
                id: doc.id,
                name: agentData.agent || `Агент БЭК№${doc.id}`,
                ...agentData,
              };
            }
            return null;
          })
          .filter((agent) => agent !== null) as Agent[];

        setAgents(res);
        setStatus('success');
      },
      () => {
        setStatus('error');
      }
    );

    return () => {
      unsubscribe();
    };
  }, [value.agent, value.date]);

  return {
    mapRef,
    agents,
    status,
    control,
    onSubmit,
    wayPoints,
    handleSubmit,
    handleResetFields,
  };
};

export default useMapService;
