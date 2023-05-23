import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from "../actions";
export const reducer = (state, action) => {
  if (action.type === OPEN_SIDEBAR) {
    return { ...state, isSideBarOpen: true };
  }
  if (action.type === CLOSE_SIDEBAR) {
    return { ...state, isSideBarOpen: false };
  }
  console.log(state);
  console.log(action);
  return state;
  throw new Error(`no ${action.type} is specified`);
};
