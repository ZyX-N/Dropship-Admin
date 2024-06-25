import { Bars3Icon } from '@heroicons/react/20/solid';
import React from 'react';
import LogoutIcon from '../icons/Logout';

const Navbar = () => {
    return (
        <nav class="body-font bg-transparent w-full">
            <div class="w-full mx-auto flex justify-between pr-4 py-1 flex-col md:flex-row items-center">
                <button type="button" className="hover:scale-105 transition-all duration-300 cursor-pointer text-2xl font-semibold"><Bars3Icon className='size-7' /> </button>
                <button class="flex items-center bg-blue-600 border-0 p-2 rounded-full focus:outline-none hover:bg-bue-700 hover:scale-105 transition-all duration-300 text-white mt-4 md:mt-0">
                    <LogoutIcon />
                </button>
            </div>
        </nav>
    );
}

export default Navbar;