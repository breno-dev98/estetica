import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const Layout = () => {
    return ( 
        <>
            <Header />
            <div className="h-screen flex-1">
                <Outlet />
            <Footer />
            </div>
        </>
     );
}
 
export default Layout;