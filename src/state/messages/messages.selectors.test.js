import * as selectors from './messages.selectors';
import { messages } from '../../mocks/mockMessages';
import { members } from '../../mocks/mockMembers';

describe('messages selectors', () => {
    const mockState = { messages, members };
        
    describe('getMessageById', () => {
            
        it('should return the correct message by id', () => {
            expect(
                selectors.getMessageById('cd445e6d-e514-424f-ba8f-16ec842002c6')(mockState)
            ).toEqual(messages[0]);
        });

        it('should return undefined if the id does not exist', () => {
            expect(
                selectors.getMessageById('incorrect-id')(mockState)
            ).toBeUndefined();
        });
    });

    describe('getRichMessages', () => {
        it('should return a rich message object', () => {
            expect(selectors.getRichMessages.resultFunc(members, messages)).toEqual([
                Object.assign({}, { messageBody: messages[0] }, { member: {
                    id: 'fe27b760-a915-475c-80bb-7cdf14cc6ef3',
                    avatar: 'https://dummyimage.com/100x100.jpg/ffff'
                } })
            ]);
        })
    })
});
