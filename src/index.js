import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.js';
import Profile from './components/profile';
import NotFound from './components/Error/NotFound';
import QuestionPage from './components/QuestionPage';
import store from './store'
import { Provider } from 'react-redux'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <NotFound />,
  },
  {
    path: "/:questionName",
    element: <QuestionPage />,
  
  },
  {
    path: "/profile/:username",
    element: <Profile />,
  
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
);