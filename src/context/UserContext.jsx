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
  current_user_id: null,
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // current user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid);
        createUser(user.displayName, user.uid);
      }
    });
    // console.log(state);
  }, []);

  const readData = async (user) => {
    console.log(user);
    if (!user) {
      // dispatch({ type: "CREATE_EXISTING_CART", payload: [] });
      console.log(null);
      return;
    }
    console.log(state.current_user);
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
    console.log(state);
    readData(state.current_user);
    // postData([]);
  }, [state.current_user]);

  // create new user
  function createUser(user, id) {
    console.log(user, id);
    dispatch({ type: CREATE_NEW_USER, payload: { user, uid: id } });
    // dispatch({ type: CREATE_NEW_USER, payload: { email, passwd } });
  }

  //login existing user
  // const loginUser = (user, password) => {
  //   dispatch({ type: LOGIN_EXISTING_USER, payload: { user, password } });
  // };

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
        console.log(error);
      });
  };

  return (
    <UserContext.Provider
      value={{ ...state, createUser, signOut, googleSignUp }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
