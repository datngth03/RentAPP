import { actionTypes } from "../actions/actionType";

const initState = {
   isLoggedIn: false,
   token: 123,
   message: "",
};

const authReducer = (state = initState, action) => {
   switch (action.type) {
      case actionTypes.REGISTER_SUCCESS:
         return {
            ...state,
            isLoggedIn: true,
            token: action.data,
         };
      case actionTypes.REGISTER_FAIL:
         return {
            ...state,
            isLoggedIn: false,
            token: null,
            message: action.data,
         };
      default:
         return state;
   }
};

export default authReducer;
