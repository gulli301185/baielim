import NavItem from '../NavItem';
import React from 'react';
import closeLogo from '@/shared/assets/close.svg';
import { logOut } from '@/app/slices/userSlice';
import openLogo from '@/shared/assets/open.svg';
import useAdminSidebar from './model/useAdminSidebar';

const AdminSidebar = () => {
  const { open, dispatch, NAV_ITEMS, handleOpen } = useAdminSidebar();

  return (
    <aside
      className={`overflow-hidden transition-all ease-in-out ${
        open ? 'max-w-64 w-full' : 'max-w-[92px] w-full'
      } h-full p-6 overflow-y-scroll blockScrollable border border-solid border-[#F6F6F6] rounded-e-lg`}
    >
      <div
        onClick={handleOpen}
        className={`absolute ${
          open ? 'left-60' : 'left-20'
        } top-8 w-7 h-7 bg-white border border-solid border-[#F6F6F6] rounded-lg tp-center cursor-pointer`}
      >
        <img
          className='w-4 h-4'
          src={open ? openLogo : closeLogo}
          alt={open ? '<' : '>'}
        />
      </div>
      <div
        className={`flex ${
          !open && 'items-center'
        } flex-col justify-between gap-6 h-full`}
      >
        <div className={`flex ${!open && 'items-center'} flex-col gap-6`}>
          <div className='flex gap-3'>
            <div className='max-w-11 w-full h-11 rounded-full'>
              <img
                className='w-full h-full rounded-full object-cover bg-slate-200'
                src={
                  'https://images.unsplash.com/photo-1490718748265-11161b222038?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }
                alt='*'
              />
            </div>
            <div
              className={`w-full justify-center flex-col gap-1 font-medium ${
                open ? 'flex' : 'hidden'
              }`}
            >
              <p className='text-[10px] text-[#757575] leading-3 line-clamp-1 uppercase'>
                Администратор
              </p>
              <p className='text-sm leading-5 line-clamp-1 uppercase'>
                Бай Элим
              </p>
            </div>
          </div>
          <hr className={`${open ? 'w-full' : 'w-4/6'} h-[2px] bg-[#F6F6F6]`} />
          <div className={`flex ${!open && 'items-center'} flex-col gap-2`}>
            {NAV_ITEMS.map((item, index) => (
              <NavItem
                expanded={open}
                key={index}
                icon={React.cloneElement(item.icon)}
                text={item.text}
                children={item.children}
              />
            ))}
          </div>
        </div>
        <div
          onClick={() => dispatch(logOut())}
          className={`flex items-center ${
            open ? 'gap-3' : 'justify-center'
          }  py-[10px] px-3 rounded-lg hover:bg-[#F6F6F6] cursor-pointer`}
        >
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M5.83203 1.66663C5.16899 1.66663 4.53311 1.93002 4.06426 2.39886C3.59542 2.8677 3.33203 3.50358 3.33203 4.16663V15.8333C3.33203 16.4963 3.59542 17.1322 4.06426 17.6011C4.5331 18.0699 5.16899 18.3333 5.83203 18.3333H14.1654C14.8284 18.3333 15.4643 18.0699 15.9331 17.6011C16.402 17.1322 16.6654 16.4963 16.6654 15.8333V15C16.6654 14.5397 16.2923 14.1666 15.832 14.1666C15.3718 14.1666 14.9987 14.5397 14.9987 15V15.8333C14.9987 16.0543 14.9109 16.2663 14.7546 16.4225C14.5983 16.5788 14.3864 16.6666 14.1654 16.6666H5.83203C5.61102 16.6666 5.39906 16.5788 5.24278 16.4225C5.0865 16.2663 4.9987 16.0543 4.9987 15.8333V4.16663C4.9987 3.94561 5.0865 3.73365 5.24278 3.57737C5.39906 3.42109 5.61102 3.33329 5.83203 3.33329H14.1654C14.3864 3.33329 14.5983 3.42109 14.7546 3.57737C14.9109 3.73365 14.9987 3.94561 14.9987 4.16663V4.99996C14.9987 5.4602 15.3718 5.83329 15.832 5.83329C16.2923 5.83329 16.6654 5.4602 16.6654 4.99996V4.16663C16.6654 3.50358 16.402 2.8677 15.9331 2.39886C15.4643 1.93002 14.8284 1.66663 14.1654 1.66663H5.83203Z'
              fill='#22c55e'
            />
            <path
              d='M13.9213 6.9107C13.5958 6.58527 13.0682 6.58527 12.7428 6.9107C12.4173 7.23614 12.4173 7.76378 12.7428 8.08921L13.8202 9.16663H9.9987C9.53846 9.16663 9.16536 9.53972 9.16536 9.99996C9.16536 10.4602 9.53846 10.8333 9.9987 10.8333H13.8202L12.7428 11.9107C12.4173 12.2361 12.4173 12.7638 12.7428 13.0892C13.0682 13.4147 13.5958 13.4147 13.9213 13.0892L16.4213 10.5892C16.7467 10.2638 16.7467 9.73614 16.4213 9.4107L13.9213 6.9107Z'
              fill='#22c55e'
            />
          </svg>

          <p
            className={`${
              open ? 'block' : 'hidden'
            } max-w-[124px] w-full text-sm font-medium leading-5 text-green-500`}
          >
            Выйти
          </p>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
