import React from 'react'
import { UserAuth } from '@/context/AuthContext'
import { useRouter } from 'next/router';

import Swal from "sweetalert2"; 

export default function Account() {
    const {user, logout} = UserAuth();
    const router = useRouter();

    const logoutMessage = () => {
     
      Swal.fire({
          title: "NEXT EVENT",
          html:"We hope to see you soon.",
          footer: "<p>Yu are logout.</p>",
      });
    };

    const handleLogOut = async () => {
      try{
        await logout()
        logoutMessage()
        router.push('/')
      } catch(error){
        console.log(error.message)
      }
    }

    return (
    <div>
        <h1>Account</h1>
        <div>
        <h3>User email: {user && user.email}</h3>
       
        </div>
        <div>
        <h2>Do you want to Signuot?</h2>
        <button onClick={handleLogOut}>Log out</button>
        </div>
    </div>
  )
}
