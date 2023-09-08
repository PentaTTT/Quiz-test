import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './Component/Admin/Admin';
import User from './Component/User/User';
import HomePage from './Component/Home/HomePage';
import DashBoard from './Component/Admin/Content/DashBoard';
import UserManagement from './Component/Admin/Content/UserManagement';
import Login from './Component/Auth/Login';
import Register from './Component/Auth/Register';
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify";
import store from './redux/store';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<App />}>
          <Route index element={<HomePage />} />
          <Route path='user' element={<User />} />
        </Route>

        <Route path='/admin' element={<Admin />} >
          <Route index element={<DashBoard />} />
          <Route path='user-management' element={<UserManagement />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
