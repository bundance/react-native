import { getMembers as getMembersFromData } from '../../data';

export function getMembers() {
  return {
    type: 'MEMBERS_LOADING',
    payload: getMembersFromData()
  };
}
