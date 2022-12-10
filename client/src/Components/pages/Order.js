import React from "react";
import { getAllFoods } from '../../utils/api';
import AuthService from '../../utils/auth';
import User from '../User';

export default function Order() {

    /* if user is logged in, go to Order page here */
    if (AuthService.isLoggedIn()) {
        return (

        <div>
            <h2>Welcome, </h2>

        </div>
     )
    } else {
        /* if user is not logged in, go to the User component */
        /* to sign up or login */
        return (<User /> );
    }
}