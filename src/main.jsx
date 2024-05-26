import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Login from './screens/login.jsx';
import Register from './screens/register.jsx';
import { Provider } from 'react-redux'
import store from './store.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './components/privateRoute.jsx';
import Home from './screens/home.jsx';
import AddExpense from './screens/addExpense.jsx';
import AllExpense from './screens/allExpense.jsx';
import UpdateExpense from './screens/updateExpense.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' index={true} element={<Login />} />
      <Route path='/register' index={true} element={<Register />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/home' element={<Home />} />
        <Route path='/addExpense' element={<AddExpense />} />
        <Route path='/allExpense' element={<AllExpense />} />
        <Route path='/updateExpense' element={<UpdateExpense />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)
