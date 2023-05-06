import React, { useState, useRef } from "react";
import { UserAuth } from "../../../context/AuthContext";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import logo from "../../../assets/NEXT.png";
import Image from "next/image";

//FUNCION VALIDADORA
function validate(input) {
  //va a recibir el estado input con los cambios detectados por los handlers
  let errors = {}; //objeto que guarda todos los errores y le agrego props con los nombres iguales a los del input
  if (!input.email) {
    errors.email = "You must enter an mail";
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.email)) {
    errors.email = "It must be a valid email";
  } else if (!input.password) {
    errors.password = "You need you enter a password";
  } else if (!/^(?=.*\d).{6,8}$$/.test(input.password)) {
    errors.password =
      "It should have between 6 and 8 characters. And must includ a number.";
  }
  return errors; //se retorna el obj errors con la prop y el string correspondiente. ej: let errors ={name: 'a name is required'}
}

export default function Signup() {
  const router = useRouter();
  const { createUser } = UserAuth();
  const [errors, setErrors] = React.useState("");
  const emailRef = useRef();
  const passwordRef = useRef();

  const registeredMessage = () => {
    // const imgSrc = logo.src;
    // const imgWidth = logo.width;
    // const imgHeight = logo.height;
    // const img = <Image src={imgSrc} width={imgWidth} height={imgHeight} />;

    Swal.fire({
      title: "NEXT EVENT",
      html: "Now you will receive updates with all our events.",
      footer: "<p>Thanks for registering.</p>",
    });
  };

  const errorRegisting = () => {
    Swal.fire({
      title: "NEXT EVENT",
      html: "Email is already in use.",
      footer: "<p>You need a different email.</p>",
    });
  };

  const errorDefault = () => {
    Swal.fire({
      title: "NEXT EVENT",
      html: "There was an error registering.",
      footer: "<p>Please, try again.</p>",
    });
  };

  // const goToAccount = () => {
  //   router.push("/account");
  // };

  const handleChange = () => {
    setErrors(
      validate({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    try {
      await createUser(emailRef.current.value, passwordRef.current.value);
      registeredMessage();
      router.push("/");
    } catch (errors) {
      switch (errors.code) {
        case "auth/email-already-in-use":
          setErrors("Email is already in use. You need a different email.");
          errorRegisting();
          break;
        default:
          setErrors(errors.message);
          errorDefault();
      }
      console.log(errors.message);
    }
  };

  return (
    <div className="signup_page">
      <form className="signup_form" onSubmit={handleSubmit}>
        <div className="input_wrap">
            <label className="label_form">Email adress:</label>
          <div className="labelInput">
            <input
              className="input_form"
              type="email"
              id="email"
              name="email"
              ref={emailRef}
              placeholder="Enter your email"
              onChange={handleChange}
            />
          {errors.email && <p className="signup_error">{errors.email}</p>}
          </div>
        </div>

        <div className="input_wrap">
            <label className="label_form">Password:</label>
          <div className="labelInput">
            <input
              className="input_form"
              type="password"
              id="password"
              name="password"
              ref={passwordRef}
              placeholder="Enter your Password"
              onChange={handleChange}
            />
          {errors.password && <p className="signup_error">{errors.password}</p>}
          </div>
        </div>

        <button className="signup_btn">Register!</button>
        <p>
          If you register, you will receive our newsletter with all the
          information about new events!
        </p>
      </form>
    </div>
  );
}
