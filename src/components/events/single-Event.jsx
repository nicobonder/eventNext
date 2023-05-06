import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import auth from "../../../firebase/auth";
import firebaseManage from "../../../firebase/firebase_manage";

import Swal from "sweetalert2";

//FUNCION VALIDADORA
function validate(input) {  //va a recibir el estado input con los cambios detectados por los handlers
  let errors = {};  //objeto que guarda todos los errores y le agrego props con los nombres iguales a los del input
  if (!input.email) {
  errors.email = 'You must enter an mail'
} if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.email)) { // eslint-disable-next-line
  errors.email = 'It must be a valid email'
}  else if (!input.password) {
  errors.password = 'You need you enter a password'
} else if (!/^(?=.*\d).{6,8}$$/.test(input.password)) {
  errors.password = 'It should have between 6 and 8 characters. And must includ a number.'
}
    return errors;  //se retorna el obj errors con la prop y el string correspondiente. ej: let errors ={name: 'a name is required'}
  }

export default function SingleEvent({ data }) {
  console.log("info", data);
  // const inputEmail = useRef();
  // const inputName = useRef();
  // const [message, setMessage] = useState("");
  // const [regEmail, setRegEmail] = React.useState("");
  // const [regPass, setRegPass] = React.useState("");
  // const [errors, setErrors] = useState({ e: '' });

  // const [input, setInput] = useState({
  //   email: "",
  //   password: "", 
  // })

  // const EmailUsed = () => {
  //   Swal.fire({
  //     // imageUrl: Error_Search,
  //     imageHeight: 150,
  //     imageWidth: 200,
  //     imageAlt: "Email usado.",
  //     title: "Yazz",
  //     html: "<h3>Ese email ya está registrado</h3>",
  //     footer: "<p>Probá con otro email.</p>",
  //   });
  // };

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   //const eventId = router?.query.id;

  //   const validRegex =
  //     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //   if (!regEmail.match(validRegex)) {
  //     setMessage("Please, introduce a correct email adress.");
  //   }
  // };

  return (
    <div className="single_event_page">
      <h1>{data.title}</h1>
      <Image
        className="single_event_img"
        width={1000}
        height={500}
        alt={data.title}
        src={data.image}
      />
      <p>{data.description}</p>

      {/* form para registrarse en el newsletter */}
      {/* <form className="email_registration">
        <h3>Do you want to receive news about Next Event?</h3>
        <label className="email_label">Get registered for or newsletter!</label>
        <div className="email_input">
          <input
            className="event_email"
            id="email"
            type="email"
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
            placeholder="Insert your email"
          />
          <input
            className="event_password"
            id="password"
            type="password"
            value={regPass}
            onChange={(e) => setRegPass(e.target.value)}
            placeholder="Insert your password"
          />
          <button
            type="submit"
            className="email_btn"
            onClick={async () => {
              const { user, error } = await auth.registrerWithEmail(
                regEmail,
                regPass
              );

              if (error != null) {
                console.log(" tu error", error);
                alert({error: errorCode + ': your error is' + errorMessage});
              } else {
                await firebaseManage.addNewUser(user);

                var url = window.location.href;
                if (url.indexOf("?") > -1) {
                  url = url.substring(0, url.indexOf("?"));
                }
                url += "?loginType=login";
                window.location.href = url;
              }
              setRegEmail('')
              setRegPass('')
            }
          }
          >
            Submit
          </button>
        </div>
      </form>
      <p>{message}</p> */}
    </div>
  );
}
