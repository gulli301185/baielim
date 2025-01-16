import down from '@/shared/assets/down.svg';
import up from '@/shared/assets/up.svg';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({
  expanded,
  icon,
  text,
  children,
}: {
  expanded: boolean;
  icon: JSX.Element;
  text: string;
  children: {
    to: string;
    icon: JSX.Element;
    text: string;
  }[];
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className='flex flex-col'>
      <div
        onClick={handleOpen}
        className={`flex items-center ${
          expanded
            ? 'gap-3 bg-green-500 text-white'
            : 'text-black hover:bg-[#F6F6F6] justify-center'
        } py-[10px] px-3 rounded-lg cursor-pointer`}
      >
        <span>{icon}</span>
        <p
          className={`${
            expanded ? 'block' : 'hidden'
          } max-w-[124px]  w-full text-sm font-medium leading-5 text-white`}
        >
          {text}
        </p>
        <img
          className={`w-4 ${expanded ? 'block' : 'hidden'}`}
          src={open ? up : down}
          alt={open ? '+' : '-'}
        />
      </div>
      <ul
        className={`grid gap-2 overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <li className='overflow-hidden'>
          {children.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className={`flex items-center ${
                expanded ? 'gap-3' : 'justify-center ml-4'
              } mt-2 py-[10px] px-3 hover:bg-[#F6F6F6] hover:text-[#1A1A1A] text-[#757575] rounded-lg cursor-pointer`}
            >
              <span>{item.icon}</span>
              <p
                className={`${
                  expanded ? 'block' : 'hidden'
                } max-w-[124px] w-full text-sm font-medium leading-5 text-inherit line-clamp-1`}
              >
                {item.text}
              </p>
            </NavLink>
          ))}
        </li>
      </ul>
    </div>
  );
};

export default NavItem;
