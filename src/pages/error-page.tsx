import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <div id="error-page" className='flex items-center justify-center flex-col space-y-5 my-auto h-screen'>
            <h1 className='font-bold text-3xl'>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p className='text-gray-500'>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}

