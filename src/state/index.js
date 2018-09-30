import { combineReducers } from 'redux';
import messages from './messages/messages.reducers';
import members from './members/members.reducers';

const reducer = combineReducers({
    members,
    messages
});

export default (state, action) => reducer(state, action);