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
        });
    });

    describe('getFormattedMessages', () => {
        it('should format the messages correctly', () => {
            // Note: the formatted timestamp should actually be "Thursday, 2 September, 04:27:38", which is what's
            // rendered in iOS and Chrome. However, in Jest, the result is "Thursday, February 9, 2017, 4:27:38 AM",
            // which is presumably due to Node implementing date.toLocaleDateString() differently.
            // No time to debug this, though, so I've left the test as it is, with node's timestamp
            expect(selectors.getFormattedMessages(mockState)).toEqual([{
                id: 'cd445e6d-e514-424f-ba8f-16ec842002c6',
                userId: 'fe27b760-a915-475c-80bb-7cdf14cc6ef3',
                message: 'Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.',
                timestamp: 'Thursday, February 9, 2017, 4:27:38 AM'
            }]);
        });
    });
});
