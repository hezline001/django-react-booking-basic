import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { MainError, Root, rootloader } from './routes/Root';
import { Signup, signupAction, signupLoader } from './routes/Signup';
import { Test, testloader } from './routes/Test';
import { Login, loginAction, loginLoader } from './routes/Login';
import { logoutLoader } from './routes/Logout';
import { adminLoginAction, adminLoginLoader } from './routes/admin/AdminLogin';
import { AdminRoot, adminRootLoader } from './routes/admin/Admin';
import { UserList, userListLoader } from './routes/admin/UserList';
import { userDeleteAction } from './routes/admin/UserDelete';
import { spaceRootAction, spaceRootLoader, SpacesRoot } from './routes/admin/spaces/SpacesRoot';
import { SpaceDetail, spaceDetailAction, spaceDetailLoader } from './routes/admin/spaces/SpaceDetail';
import { SpaceDetailUserAction, SpaceDetailUserLoader,WrappedSpaceDetailUser } from './routes/spaces/SpaceDetailUser';
import { spaceDestroy } from './routes/admin/spaces/SpaceDestroy';
import { Rust, rustloader } from './routes/Rust';

const router = createBrowserRouter([
  {
    path:'/rust',
    element: Rust,
    loader: rustloader,
  },
  {
    path:'/',
    element:<Root/>,
    loader:rootloader,
    errorElement:<MainError/>,
  },
  {
    path:'/spaces/:spaceId',
    element:<WrappedSpaceDetailUser/>,
    loader:SpaceDetailUserLoader,
    action:SpaceDetailUserAction,
  },
  {
    path:'/signup',
    element:<Signup/>,
    action:signupAction,
    loader:signupLoader,
    errorElement:<MainError/>,
  },
  {
    path:'/test',
    element:<Test/>,
    loader:testloader,
  },
  {
    path:'/login',
    element:<Login/>,
    loader:loginLoader,
    action:loginAction,
    errorElement:<MainError/>,
  },
  {
    path:'/logout',
    loader:logoutLoader,
  },
  {
    path:'/admin/login',
    element:<Login/>,
    loader:adminLoginLoader,
    action:adminLoginAction,
  },
  {
    path:'/admin',
    element:<AdminRoot/>,
    loader:adminRootLoader,
    shouldRevalidate:({ currentUrl }) => {
      return currentUrl.pathname !== "/admin/users";
    },
    children:[
      {
        path:'users',
        element:<UserList/>,
        loader:userListLoader,
        children:[
          {
            path:':userId/delete',
            action:userDeleteAction,
          },
        ],
      },
      {
        path:'spaces',
        element:<SpacesRoot/>,
        loader:spaceRootLoader,
        action:spaceRootAction,
        children:[
          {
            path:':spaceId',
            element:<SpaceDetail/>,
            loader:spaceDetailLoader,
            action:spaceDetailAction,
          },
          {
            path:'destroy/:spaceId',
            action:spaceDestroy,
          },
        ],
      },
      
    ],
  },

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <RouterProvider router={router}/>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
