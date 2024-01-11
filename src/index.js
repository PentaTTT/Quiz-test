import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-awesome-lightbox/build/style.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './Component/Admin/Admin';
//import User from './Component/User/User';
import HomePage from './Component/Home/HomePage';
import DashBoard from './Component/Admin/Content/DashBoard';
import UserManagement from './Component/Admin/Content/Account/UserManagement';
import Login from './Component/Auth/Login';
import Register from './Component/Auth/Register';
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify";
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import 'nprogress/nprogress.css'
import ListQuizCard from './Component/User/ListQuizCard';
import DetailQuiz from './Component/User/DetailQuiz';
import NotFound from './Component/NotFound';
import QuizManagement from './Component/Admin/Content/Quiz/QuizManagement';
import QuestionManagement from './Component/Admin/Content/Question/QuestionManagement';
import PrivateRoutes from './routes/PrivateRoutes';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* đảm bảo nạp store */}
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<App />}>
            <Route index element={<HomePage />} />
            <Route path='user' element={
              <PrivateRoutes>
                <ListQuizCard />
              </PrivateRoutes>
            } />
          </Route>
          <Route path='quiz/:id' element={<DetailQuiz />} />

          <Route path='/admin' element={
            <PrivateRoutes>
              <Admin />
            </PrivateRoutes>
          } >
            <Route index element={<DashBoard />} />
            <Route path='user-management' element={<UserManagement />} />
            <Route path='quiz-management' element={<QuizManagement />} />
            <Route path='question-management' element={<QuestionManagement />} />
          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<NotFound />} />
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
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
