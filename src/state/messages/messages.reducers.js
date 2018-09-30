
export default function (state = [], action = {}) {
  switch (action.type) {
    case 'MESSAGES_LOADING_FULFILLED': 
      return action.payload;
    default:
      return state
  };
}