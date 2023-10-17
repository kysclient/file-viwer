import {ReactElement} from "react";


export default function AppLogo(): ReactElement {
    return (
        <>
            <h1 className='hidden xs:flex'>
                <button
                    className='custom-button main-tab text-accent-blue transition hover:bg-light-primary/10
                           focus-visible:bg-accent-blue/10 focus-visible:!ring-accent-blue/80
                           dark:text-twitter-icon dark:hover:bg-dark-primary/10'
                >
                    <img className='w-[50px] h-[50px] rounded-full' alt='logo'
                         src={'https://image.ninehire.com/profile/ecc9daf0-12d1-11ed-b0c9-432568ed9937/f97a18d0-510c-11ee-8820-b1064cc0b2a2.png?w=200&h=200'}/>
                </button>
            </h1>
        </>
    )
}
