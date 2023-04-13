import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";


export default function SingleEvent({ data }) {
  console.log('info', data);
  const inputEmail = useRef();
  const router = useRouter()
  const [message, setMessage] = useState('')
  
  const onSubmit = async (e) => {
    e.preventDefault()
    const emailValue = inputEmail.current.value;
    const eventId = router?.query.id;
    //const eventName = data.title;

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!emailValue.match(validRegex)){
      setMessage('Please, introduce a correct email adress.')
    }
    
    try{
      const response = await fetch ('/api/email-registration', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: emailValue, eventId,
          // eventName: eventName
        })
      });
      if(!response.ok) throw new Error(`Error: ${response.status}`)
      const data = await response.json();
      setMessage(data.message);
      inputEmail.current.value = '';
    } catch (e){
      console.log('Error', e);
    }
  };

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
      <form onSubmit={onSubmit} className="email_registration">
        <label className="email_label">Get registered for this event!</label>
        <div className="email_input">
          <input 
            className="event_email" 
            id="email" 
             
            placeholder="Insert your email" 
            ref={inputEmail}
            />
          <button type="submit" className="email_btn">Submit</button>
        </div>
      </form>
      <p>{message}</p>
    </div>
  );
}