import React, { useEffect, useRef } from "react";
//Importo UserAuth para tener las funciones de AuthContext
import { UserAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

import Swal from "sweetalert2";
import logo from "../../../assets/NEXT.png";
import Image from "next/image";

//FUNCION VALIDADORA
function validate(input) {
  //va a recibir el estado input con los cambios detectados por los handlers
  let errors = {}; //objeto que guarda todos los errores y le agrego props con los nombres iguales a los del input
  if (!input.email) {
    errors.email = "You must enter your mail";
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.email)) {
    errors.email = "It must be a valid email";
  } else if (!input.password) {
    errors.password = "You need you enter your password";
  } else if (!/^(?=.*\d).{6,8}$$/.test(input.password)) {
    errors.password =
      "Remember: It has between 6 and 8 characters. And includs a number.";
  }
  return errors; //se retorna el obj errors con la prop y el string correspondiente. ej: let errors ={name: 'a name is required'}
}

export default function SignIn() {
  const [errors, setErrors] = React.useState("");
  const emailRef = useRef();
  const passwordRef = useRef();

  const router = useRouter();

  const { signIn, isUserAuthenticated } = UserAuth();

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

  // useEffect(() => {
  //   // checks if the user is authenticated
  //   !!isUserAuthenticated()
  //   ? router.push("/signin")
  //   : router.push("/");
  // }, []);

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
    try{
        await signIn(emailRef.current.value, passwordRef.current.value);
        router.push("/");
    } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            setErrors(
              "User not found.Please, check your email."
              );
              userNotFound()
            break;
          case "auth/wrong-password":
            setErrors("Password is incorrect.");
            wrongPassword()
            break;
          default:
            setErrors(error.message);
            errorDefault()
        }
      }
  };

  return (
    <div className="signIn_wrap">
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

        <button className="sign_btn">Sign In</button>
      </form>
      <div className="separator"></div>
    </div>
  );
}

/*import React, { useEffect, useState, useRef } from "react";
//Importo UserAuth para tener las funciones de AuthContext
import { UserAuth } from "@/context/AuthContext";
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

export default function SignIn() {
  const [errors, setErrors] = React.useState("");
  const emailRef = useRef();
  const passwordRef = useRef();

  const router = useRouter();

  const { signIn, isUserAuthenticated } = UserAuth();

  const userNotFound = () => {
    Swal.fire({
      title: "NEXT EVENT",
      html: "User not found. Please, check your email.",
      footer: "<p>Please, try again.</p>",
    });
  };

  const wrongPassword = () => {
    Swal.fire({
      title: "NEXT EVENT",
      html: "Password is incorrect.",
      footer: "<p>Please, try again.</p>",
    });
  };

  const errorDefault = () => {
    Swal.fire({
      title: "NEXT EVENT",
      html: "There was some mistake.",
      footer: "<p>Please, try again.</p>",
    });
  };

  // useEffect(() => {
  //   // checks if the user is authenticated
  //   !!isUserAuthenticated()
  //   ? router.push("/signin")
  //   : router.push("/");
  // }, []);

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
      await signIn(email, password);
      router.push("/");
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          setErrors("User not found. Please, check your email.");
          userNotFound();
          break;
        case "auth/wrong-password":
          setErrors("Password is incorrect.");
          wrongPassword();
          break;
        default:
          setErrors(error.message);
          errorDefault();
      }
    }
  };

  return (
    <div className="signIn_wrap">
      <form className="signup_form" onSubmit={handleSubmit}>
        <div className="input_wrap">
          <div className="labelInput">
            <label className="label_form">Email adress:</label>
            <input
              className="input_form"
              type="email"
              name="email"
              ref={emailRef}
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>
          {errors.email && <p className="signup_error">{errors.email}</p>}
        </div>

        <div className="input_wrap">
          <div className="labelInput">
            <label className="label_form">Password:</label>
            <input
              className="input_form"
              type="password"
              name="password"
              ref={passwordRef}
              placeholder="Enter your Password"
              onChange={handleChange}
            />
          </div>
          {errors.password && <p className="signup_error">{errors.password}</p>}
        </div>

        <button className="sign_btn">Sign In</button>
      </form>
      <div className="separator"></div>
    </div>
  );
}
*/