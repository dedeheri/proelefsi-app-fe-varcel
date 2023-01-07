import React from "react";
import Google from "react-google-login";

function GoogleLogin() {
  function onSuccess(res) {
    console.log("success", res.profileObj);
  }

  function onFailure(res) {
    console.log("failed", res);
  }

  return (
    <Google
      className="font-medium cursor-pointer text-md border dark:border-[#353535] dark:hover:bg-[#353535] w-full h-10 flex items-center justify-center rounded-md hover:bg-gray-100 duration-300"
      clientId="894447561553-jm13ojhjbre4hki9tgddue3v5l2vdk8e.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy="single_host_origin"
      isSignedIn={true}
    />
  );
}

export default GoogleLogin;
