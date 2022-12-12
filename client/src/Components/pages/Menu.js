import React from "react";
import AuthService from "../../utils/auth";
import LoggedInMenu from "./LoggedInMenu";
import LoggedOutMenu from "./LoggedOutMenu";


export default function Menu() {

    if (AuthService.isLoggedIn()) {
        return (<LoggedInMenu />);
    } else {
        return (<LoggedOutMenu />);
    }

}