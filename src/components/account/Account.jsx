import React from "react";
import { UserAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import SignIn from "../signin/SignIn";
import Signup from "../signup/Signup";

export default function Account() {
  const { user, logout } = UserAuth();
  const router = useRouter();

  const logoutMessage = () => {
    Swal.fire({
      title: "NEXT EVENT",
      html: "We hope to see you soon.",
      footer: "<p>Yu are logout.</p>",
    });
  };

  const handleLogOut = async () => {
    try {
      await logout();
      logoutMessage();
      router.push("/account");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="account_page">
      <h1>Account</h1>
      {user ? (
        <>
        
          <div className="registered_user">
            <h2>User email: {user && user.email}</h2>
            <h3>Do you want to Signuot?</h3>
            <button className="logout_btn" onClick={handleLogOut}>Log out</button>
          </div>
        </>
      ) : (
        <>
          <div className="not_registered_user">
            <div className="form_container">
              <h2>Do you want to login?</h2>
              <SignIn />
            </div>
            <div className="form_container">
              <h2>You still do not have an account?</h2>
              <Signup />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
