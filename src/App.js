import './App.scss';
import Header from './Component/Header/Header';
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from "react-perfect-scrollbar";

const App = () => {
  return (
    <div className="app-container">
      <div className='header-container'>
        <Header />
      </div>
      <div className='main-container'>
        <div className='sidebar'></div>
        <div className='content'>
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>

    </div>
  );
}

export default App;
