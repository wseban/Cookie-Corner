import React, {useState} from "react";
import Header from './Header';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Cater from './pages/Cater';
import Footer from "./Footer";

export default function Content() {
    const [currentPage, setCurrentPage] = useState('Home');
    const renderPage = () => {
        if (currentPage === 'Home') {
          return <Home />;
        }
        if (currentPage === 'Menu') {
          return <Menu />;
        }
        if (currentPage === 'Order') {
          return <Order />;
        }
        return <Cater />;
      };
    
      const changePage = (page) => setCurrentPage(page);
    

    return (
        <main>
            <Header currentPage={currentPage} changePage={changePage} />
            <main>{renderPage()}</main>
            <Footer />
        </main>
    );
};