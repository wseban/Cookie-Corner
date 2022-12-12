import React from "react";
import AuthService from '../utils/auth';

export default function SignOut() {
  /* sign out */
  AuthService.deleteToken();
  document.location.href = '/';
  return (<></>);
}