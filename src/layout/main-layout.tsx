import type {DefaultToastOptions} from 'react-hot-toast';
import {ReactElement} from "react";
import {Toaster} from "react-hot-toast";
import {Outlet} from 'react-router-dom';
import {Sidebar} from "../components/sidebar/sidebar";

const toastOptions: DefaultToastOptions = {
    style: {
        borderRadius: '10px',
        background: '#fff',
        color: '#333',
    },
    success: {duration: 2000}
};

export function MainLayout(): ReactElement {
    return (

        <div className='flex w-full min-h-screen gap-4'>
            <Sidebar />
            <Outlet/>
            <Toaster
                position='top-center'
                toastOptions={toastOptions}
                containerClassName='mb-12 xs:mb-0'
            />
        </div>
    );
}
