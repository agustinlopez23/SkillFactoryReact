import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth/authSlice";
import { startLoadingInfo } from "../store/notes/thunks";

export const useCheckAuth = () => {
  
    const { status } = useSelector( state => state.auth );

    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged( FirebaseAuth, async ( user ) => {
            if(!user) return dispatch(logout());

            const { uid, email, displayName, photoURL } = user;

            dispatch(login({uid, email, displayName, photoURL}));

            dispatch( startLoadingInfo() );
        } )
    }, []);

    return {
        status
    }    

}
    