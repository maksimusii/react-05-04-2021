import messageMiddleware from './messageMiddleware.js';
import {createMiddleware} from 'redux-api-middleware'; 

export default [
    createMiddleware(),
    messageMiddleware
];

