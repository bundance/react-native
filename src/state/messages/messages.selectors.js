import { createSelector } from 'reselect';
import { selectMembers } from '../members/members.selectors';

export const selectMessages = state => state.messages;

export const getMessageById = id => createSelector(
    [selectMessages],
    messages => messages.find(message => message.id === id)
);

// Rich messages are messages with their corresponding member details added. It's not remotely efficient,
// but it's quick to write, does the job, and reselect's memoization minimizes the performance hit
export const getRichMessages = createSelector([
    selectMembers,
    selectMessages
], (members, messages) => messages.map(message => {
    const DEFAULT_AVATAR = 'https://dummyimage.com/100x100.jpg';
    const member = members.find(member => member.id === message.userId);

    if(!member.avatar) {
        member.avatar = DEFAULT_AVATAR;
    }
    //Ensure avatar's uri contains the 'https' protocol scheme, as dummyimage.com has now switched to https
    if(!member.avatar.includes('https')) {
        const regex = /http/gi;
        member.avatar = member.avatar.replace(regex, 'https');
    }

    return  Object.assign({}, { messageBody: message }, { member });
}));
    