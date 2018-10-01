import reducer from './messages.reducers';
import { messages } from '../../mocks/mockMessages';

it('should set messages in the store', () => {
    const updatedStateSlice = reducer([], { type: 'MESSAGES_LOADING_FULFILLED', payload: messages });
  
    expect(updatedStateSlice).toEqual(messages);
});
  