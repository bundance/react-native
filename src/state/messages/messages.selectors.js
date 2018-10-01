import { createSelector } from 'reselect';
import { getFormattedMembers } from '../members/members.selectors';

export const selectMessages = state => state.messages;

export const getSortedMessages = createSelector(
    [selectMessages],
    sortMessages
)

export const getFormattedMessages = createSelector(
    [getSortedMessages],
    formatMessages
);

export const getMessageById = id => createSelector(
    [selectMessages],
    messages => messages.find(message => message.id === id)
);

// Rich messages are messages with their corresponding member details added. It's not all that efficient,
// but it's quick to write, does the job, and reselect's memoization minimizes the performance hit.
//
// A more performant alternative would be to use normalizr to convert the messages and members arrays into
// objects keyed by id, and to only retrieve the member details for the messages being displayed
export const getRichMessages = createSelector([
    getFormattedMembers,
    getFormattedMessages
], (members, messages) => {
    return messages.map(message => {
        const member = members.find(member => member.id === message.userId);
        return  Object.assign({}, { messageBody: message }, { member });
    });
});

////// HELPERS ////// 
function sortMessages(messages) {
    return messages.sort((msgA, msgB) => (new Date(msgA.timestamp) - new Date(msgB.timestamp)))
}


function formatMessages(messages) {
    return messages.map(message => ({ 
        ...message, 
        timestamp: formatTimestamp(message.timestamp)
    }));
}

export function formatTimestamp(timestamp) {
    if (!timestamp) {
        return timestamp;
    }
    
    const options = { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 
        hour: '2-digit', minute: '2-digit', second: '2-digit' 
    };
    const d = new Date(timestamp);
    return d.toLocaleDateString('en-GB', options);
}
    