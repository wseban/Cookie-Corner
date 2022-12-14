import React from "react";
import AuthService from '../../utils/auth';
import User from '../User';
import Order from './Order';


export default function SignIn() {

    /* if user is logged in, go to Order page here */
    if (AuthService.isLoggedIn()) {
        return (<Order />);
    } else {
        /* if user is not logged in, go to the User component */
        /* to sign up or login */
        return (<User /> );
    }
}