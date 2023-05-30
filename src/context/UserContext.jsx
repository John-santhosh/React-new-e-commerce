import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/UserReducer";
import {
  CREATE_NEW_USER,
  LOGIN_EXISTING_USER,
  SIGN_OUT_USER,
} from "../actions";
import { auth, provider } from "../config/Config";
import {
  GoogleAuthProvider,
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { toast } from "react-toastify";
const UserContext = createContext();

//hook
export const useUserContext = () => useContext(UserContext);
const initialState = {
  current_user: "",
  userLogged: false,
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // current user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        createUser(user.displayName);
      }
    });
  }, []);

  // create new user
  const createUser = (user) => {
    dispatch({ type: CREATE_NEW_USER, payload: user });
    // dispatch({ type: CREATE_NEW_USER, payload: { email, passwd } });
  };

  //login existing user
  const loginUser = (user, password) => {
    dispatch({ type: LOGIN_EXISTING_USER, payload: { user, password } });
  };

  //sign put user
  const signOut = () => {
    dispatch({ type: SIGN_OUT_USER });
  };

  //
  // signup with googole

  const googleSignUp = () => {
    // signInWithRedirect(auth, provider);

    signInWithRedirect(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        createUser(user.displayName);
        toast.success(`welcome ${state.current_user}`);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <UserContext.Provider
      value={{ ...state, loginUser, createUser, signOut, googleSignUp }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
