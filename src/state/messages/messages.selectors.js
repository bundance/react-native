import { createSelector } from 'reselect';
import { selectMembers } from '../members/members.selectors';

export const selectMessages = state => state.messages;

export const getMessageById = id => createSelector(
    [selectMessages],
    messages => messages.find(message => message.id === id)
);

export const getRichMessages = createSelector([
    selectMembers,
    selectMessages
], (members, messages) => messages.map(message => {
    const member = members.find(member => member.id === message.userId);
    return Object.assign({}, { messageBody: message }, { member });
}));
    

