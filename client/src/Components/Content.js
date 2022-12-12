import React, {useState} from "react";
import Header from './Header';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cater from './pages/Cater';
import Footer from "./Footer";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";

export default function Content() {
    const [currentPage, setCurrentPage] = useState('Home');
    const renderPage = () => {
        if (currentPage === 'Home') {
          return <Home />;
        }
        if (currentPage === 'Menu') {
          return <Menu />;
        }
        if (currentPage === 'Signin') {
          return <SignIn />;
        }
        if (currentPage === 'Dashboard') {
          return <Dashboard />;
        }
        return <Cater />;
      };
    
      const changePage = (page) => setCurrentPage(page);
    

    return (
        <main>
            <Header currentPage={currentPage} changePage={changePage} />
            <div className="body">{renderPage()}</div>
            <Footer />
        </main>
    );
};