import { createMiddleware } from 'redux-api-middleware'
import messageMiddleware from './messageMiddleware';
import routerMiddleware from './routerMiddleware';

export default [
    createMiddleware(),
    messageMiddleware,
    routerMiddleware
];
