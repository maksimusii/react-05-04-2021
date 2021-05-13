import messageMiddleware from './messageMiddleware';
import routerMiddleware from './routerMiddleware';
import { createMiddleware } from 'redux-api-middleware'

export default [
    messageMiddleware,
    routerMiddleware,
    createMiddleware()
];
