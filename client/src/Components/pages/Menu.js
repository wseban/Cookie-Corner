import React from "react";
import AuthService from "../../utils/auth";
// import LoggedInMenu from "./LoggedInMenu";
import LoggedOutMenu from "./LoggedOutMenu";
import OrderForm from "./OrderForm";


export default function Menu() {

    if (AuthService.isLoggedIn()) {
        return (<OrderForm />);
    } else {
        return (<LoggedOutMenu />);
    }

}