import { CHANGE_VIEW } from "../actions";

const reducer = (state, { type, payload }) => {
  console.log(type);
  if (type === CHANGE_VIEW) {
    if (payload === "GRID") {
      return { ...state, gridView: true, gridView_2: false, listView: false };
    }
    if (payload === "GRID2") {
      return { ...state, gridView: false, gridView_2: true, listView: false };
    }
    if (payload === "LIST") {
      return { ...state, gridView: false, gridView_2: false, listView: true };
    }
  }
  return state;
  // throw new Error(`no ${action.type} is specified`);
};

export default reducer;
