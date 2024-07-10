import { Outlet } from "react-router-dom";
import { Footer } from "flowbite-react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Header from "./Header";

const Layout = () => {

    return (
        <>
            <div className="flex min-h-dvh w-full h-full flex-col justify-between">
                <Header />
                <div className="flex w-full flex-1 flex-col justify-center mx-auto px-6 py-2">
                    <Outlet />
                </div>
                <div className="w-full">
                    <Footer container>
                        <Footer.Copyright href="#" by="Margarita Disco™" year={2024} />
                        <Footer.LinkGroup>
                            <Footer.Link href="https://www.instagram.com/docta.dev/">Desarrollo: doctaDev</Footer.Link>
                        </Footer.LinkGroup>
                    </Footer>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
export default Layout;
