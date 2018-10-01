import { createSelector } from 'reselect';

export const DEFAULT_AVATAR = 'https://dummyimage.com/100x100.jpg';

export const selectMembers = state => state.members;

export const getFormattedMembers = createSelector(
    [selectMembers],
    formatMembers
)

////// HELPERS //////

export function formatMembers(members) {
    return members.map(formatMember);
}

export const formatMember = member => {
    if (!member) {
        return member;
    }
    let avatar = member.avatar;
    
    //Ensure avatar's uri contains the 'https' protocol scheme, as dummyimage.com has now switched to https
    if (member.avatar && !member.avatar.includes('https')) {
        const regex = /http/gi;
        avatar = member.avatar.replace(regex, 'https');
    }

    return {
        ...member,
        avatar: member.avatar ? avatar : DEFAULT_AVATAR
    }
}