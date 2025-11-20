import {Link,useLocation} from 'react-router-dom';
import { use, useState } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {useNavigate} from "react-router-dom";
import {logoutUser} from "../firebaseFunction/auth.jsx";
import { useAuth } from '../context/authContext.jsx';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const navigation = [
    { name: 'My Cases', href: ''},
    { name: 'All Cases', href: '#'},
]

export default function Navbar() {
  const [current ,setCurrent] = useState(useLocation().pathname.replace('/','') || 'My Cases');
  const navigate = useNavigate();
  const {user, userDetail} = useAuth();

  const navItems = userDetail?.admin ?
    [...navigation,{name:"Admin Panel", href:'admin'}] : navigation;


  const handleLogout = async () => {
    await logoutUser();
    console.log("Navigating to login page after logout.");
    navigate("/login");
  }

  const handlePageClick = (pageName) => {
    setCurrent(pageName);
    navigate(`/${pageName}`);
  };

  return (<>
    <Disclosure as="nav" className="relative bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navItems.map((item) => (
                  <Link
                    to={`/${item.href}`}
                    className={classNames(
                      current === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white hover:cursor-pointer',
                      'rounded-md px-3 py-2 text-sm font-medium hover:cursor-pointer',
                    )}
                    onClick={() => handlePageClick(item.href)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Username and Logout Button */}
            {/* <span className="text-gray-300 px-3 py-2 text-sm font-medium">
              {user ? user.email : 'Guest'}
            </span> */}
            <button onClick={handleLogout} className='bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium hover:bg-white/5 hover:text-white hover:cursor-pointer'>
                    Logout
                  </button>
          </div>
        </div>
      </div>
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navItems.map((item) => (
            // <DisclosureButton
            //   key={item.name}
            //   as="a"
            //   href={item.href}
            //   aria-current={item.current ? 'page' : undefined}
            //   className={classNames(
            //     item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
            //     'block rounded-md px-3 py-2 text-base font-medium',
            //   )}
            // >
            //   {item.name}
            // </DisclosureButton>
              <Link
              className={classNames(
                current === item.name ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium hover:bg-white/5 hover:text-white hover:cursor-pointer',
              )}
              to={`/${item.href}`}
              onClick={() => handlePageClick(item.href)}
            >
              {item.name}
              </Link>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure> 
    </>
  )
}