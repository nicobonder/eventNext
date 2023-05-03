import React from "react";
import { UserAuth } from "../../../context/AuthContext";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import logo from "../../../assets/NEXT.png";
import Image from "next/image";

export default function Signup() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const router = useRouter();

  const { createUser } = UserAuth();

  const registeredMessage = () => {
    const imgSrc = logo.src;
    const imgWidth = logo.width;
    const imgHeight = logo.height;

    const img = <Image src={imgSrc} width={imgWidth} height={imgHeight} />;

    Swal.fire({
        title: "NEXT EVENT",
        html:"Now you will receive updates with all our events.",
        footer: "<p>Thanks for registering.</p>",
    });
  };

  const errorRegisting = () => {
    const imgSrc = logo.src;
    const imgWidth = logo.width;
    const imgHeight = logo.height;

    const img = <Image src={imgSrc} width={imgWidth} height={imgHeight} />;

    Swal.fire({
        title: "NEXT EVENT",
        html:"Email is already in use. ",
        footer: "<p>You need a different email.</p>",
    });
  };

  const errorDefault = () => {
    const imgSrc = logo.src;
    const imgWidth = logo.width;
    const imgHeight = logo.height;

    const img = <Image src={imgSrc} width={imgWidth} height={imgHeight} />;

    Swal.fire({
        title: "NEXT EVENT",
        html:"There was an error registering.",
        footer: "<p>Please, try again.</p>",
    });
  };

  const goToAccount = () => {
    router.push("/account");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      registeredMessage();
      router.push("/");
    } catch (errors) {
        switch (errors.code) {
          case "auth/email-already-in-use":
            setError("Email is already in use. You need a different email.");
            errorRegisting()
            break;
          default:
            setError(errors.message);
            errorDefault();
        }
        console.log(errors.message)
      }
  };

  return (
    <div className="signup_page">

      <form className="signup_form" onSubmit={handleSubmit}>
        <div className="input_wrap">
          <label className="label_form">Email adress</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="input_form"
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <div className="input_wrap">
          <label className="label_form">Password:</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="input_form"
            type="password"
            minLength="6"
            placeholder="Enter your Password"
          />
        </div>

        <button className="sign_btn">Register!</button>
        <p>If you register, you will receive our newsletter with all the information about new events!</p>
      </form>
    </div>
  );
}
