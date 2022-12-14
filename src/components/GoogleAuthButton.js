import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const GoogleAuthButton = ({ onSuccess, onFailure }) => (
  <GoogleLogin
  clientId="730246444349-9hq6kctetsldg9sd6ssiiot1d476oje8.apps.googleusercontent.com"
  redirectUri="http://localhost:5000/auth/google/callback"
  onSuccess={onSuccess}
  onFailure={onFailure}
  className="google-auth-button"
  />
);

export default GoogleAuthButton;
