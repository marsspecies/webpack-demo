import React from 'react';
import {Redirect} from 'react-router-dom';
import asyncComponent from 'utils/asyncComponent';

const Home = asyncComponent(() => import(/* webpackChunkName */ 'pages/home/home'));
const Details = asyncComponent(() => import(/* webpackChunkName */ 'pages/details/details'));


const rootPath = '/home';
const routes = [
    {
        key: 'root',
        path: '/',
        exact: true,
        render: () => <Redirect to={rootPath} />
    },
    {
        key: 'home',
        path: '/home',
        component: Home
    },
    {
        key: 'details',
        path: '/detail',
        component: Details
    }
];
export default routes;