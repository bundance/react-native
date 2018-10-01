export const selectMembers = state => state.members;

export const getMemberById = id => createSelector(
    [selectMembers],
    members => members.find(member => member.id === id)
);