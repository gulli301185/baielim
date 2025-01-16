import { NavLink } from 'react-router-dom';

type Props = {
  title: string;
  url: string;
};

const ContentHeader = ({ title, url }: Props) => {
  return (
    <div className='flex justify-between items-center pb-4'>
      <h2 className='text-xl font-bold'>{title}</h2>
      <NavLink
        to={url}
        className='px-3 py-2 rounded bg-green-500 hover:bg-green-500 duration-300 text-white'
      >
        Создать
      </NavLink>
    </div>
  );
};

export default ContentHeader;
