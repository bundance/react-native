import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import reducer from './state';

export const store = createStore(reducer, {}, applyMiddleware(
  promiseMiddleware()
));