import { CREATE_NEW_USER, SIGN_OUT_USER } from "../actions";

const reducer = (state, { type, payload }) => {
  // console.log(payload.type);
  if (type === CREATE_NEW_USER) {
    return { ...state, current_user: payload, userLogged: true };
  }
  if (type == SIGN_OUT_USER) {
    return { ...state, current_user: "", userLogged: false };
  }
  return state;
  // throw new Error(`no ${payload.type} defined `)
};

export default reducer;
