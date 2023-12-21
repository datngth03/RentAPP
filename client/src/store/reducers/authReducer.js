import { actionTypes } from "../actions/actionType";

const initState = {
   isLoggedIn: false,
   token: 123,
   message: "",
};

const authReducer = (state = initState, action) => {
   switch (action.type) {
      case actionTypes.REGISTER_SUCCESS:
      case actionTypes.LOGIN_SUCCESS:
         return {
            ...state,
            isLoggedIn: true,
            token: action.data,
            message: "",
         };
      case actionTypes.REGISTER_FAIL:
      case actionTypes.LOGIN_FAIL:
         return {
            ...state,
            isLoggedIn: false,
            token: null,
            message: action.data,
         };
      case actionTypes.LOGOUT:
         return {
            ...state,
            isLoggedIn: false,
            token: null,
            message: "",
         };
      default:
         return state;
   }
};

export default authReducer;
