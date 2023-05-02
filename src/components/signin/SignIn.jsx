import React from "react";
//Importo UserAuth para tener las funciones de AuthContext
import { UserAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import logo from "../../../assets/NEXT.png";
import Image from "next/image";

export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const router = useRouter();

  const { signIn } = UserAuth();

  const userNotFound = () => {  
    Swal.fire({
        title: "NEXT EVENT",
        html:"User not found. Please, check your email.",
        footer: "<p>Please, try again.</p>",
    });
  };

  const wrongPassword = () => {
    Swal.fire({
        title: "NEXT EVENT",
        html:"Password is incorrect.",
        footer: "<p>Please, try again.</p>",
    });
  };

  const errorDefault = () => {
    Swal.fire({
        title: "NEXT EVENT",
        html:"There was some mistake.",
        footer: "<p>Please, try again.</p>",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try{
        await signIn(email, password);
        router.push("/");
    } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            setError(
              "User not found.Please, check your email."
              );
              userNotFound()
            break;
          case "auth/wrong-password":
            setError("Password is incorrect.");
            wrongPassword()
            break;
          default:
            setError(error.message);
            errorDefault()
        }
      }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form className="signup_form" onSubmit={handleSubmit}>
        <div>
          <label className="label_form">Email adress</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="input_form"
            type="email"
          />
        </div>

        <div>
          <label className="label_form">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="input_form"
            type="password"
          />
        </div>

        <button className="sign_btn">Sign In</button>
      </form>
    </div>
  );
}