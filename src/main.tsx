import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/globals.scss'
import {
    createBrowserRouter,
    RouterProvider,
    Navigate
} from "react-router-dom";
import MainPage from "./pages/main/main-page";
import ErrorPage from "./pages/error-page";
import {MainLayout} from "./layout/main-layout";
import {RecoilRoot} from "recoil";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {element: <Navigate to="/main"/>, index: true},
            {path: '/main', element: <MainPage/>},
        ],
        errorElement: <ErrorPage/>,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RecoilRoot>
            <RouterProvider router={router}/>
        </RecoilRoot>
    </React.StrictMode>,
)
