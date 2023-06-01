import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/UserReducer";
import {
  CREATE_NEW_USER,
  LOGIN_EXISTING_USER,
  SIGN_OUT_USER,
} from "../actions";
import { auth, db, provider } from "../config/Config";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { toast } from "react-toastify";
import { doc, getDoc, setDoc } from "firebase/firestore";
const UserContext = createContext();

//
const getLocalStorage = () => {
  let cart = localStorage.getItem("cart");

  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};
//hook
export const useUserContext = () => useContext(UserContext);
const initialState = {
  current_user: "",
  userLogged: false,
  user_cart: getLocalStorage(),
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

  const readData = async (user) => {
    if (user === "") {
      // dispatch({ type: "CREATE_EXISTING_CART", payload: [] });
      return;
    }
    const docRef = doc(db, state.current_user, "cart");
    // console.log(user);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log(docSnap.data().cart);
      dispatch({ type: "CREATE_EXISTING_CART", payload: docSnap.data().cart });
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  //

  const postData = async (object) => {
    if (state.current_user === "") {
      return;
    }
    try {
      const docRef = await setDoc(doc(db, state.current_user, "cart"), {
        cart: object,
      });
      console.log("Document written with ID: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    readData(state.current_user);
    // postData([]);
  }, [state.current_user]);
  // create new user
  function createUser(user) {
    dispatch({ type: CREATE_NEW_USER, payload: user });
    // dispatch({ type: CREATE_NEW_USER, payload: { email, passwd } });
  }

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
