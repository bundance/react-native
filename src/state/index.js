import { combineReducers } from 'redux';
import messages from './messages/messages.reducers';
// import users from './users/users.reducers';
console.log({ messages });

const reducer = combineReducers({
    messages
    // users
});

export default (state, action) => reducer(state, action);