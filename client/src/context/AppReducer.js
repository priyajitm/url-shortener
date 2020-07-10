export default (state, action) => {
  switch (action.type) {
    case 'GEN_URL': {
      return {
        ...state,
        url: action.payload,
      };
    }
    default:
      return state;
  }
};
