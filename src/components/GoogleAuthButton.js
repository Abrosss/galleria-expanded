import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const GoogleAuthButton = ({ onSuccess, onFailure }) => (
  <GoogleLogin
  clientId="YOUR_GOOGLE_CLIENT_ID"
  redirectUri="http://localhost:5000/auth/google/callback"
  onSuccess={onSuccess}
  onFailure={onFailure}
  />
);

export default GoogleAuthButton;
