import Link from "next/link"
import Image from "next/image"
import { useState } from "react";

//tengo que saber si el usuario esta logueado para ver si le muestro el boton de logout
import ButtonSingOut from '../singOut';
import auth from '../../../firebase/auth'

export const Header = () => {
  const [userLoged, setUserLoged] = useState(false)

  const checkUser = () => {auth.currentUser?.email ? <ButtonSingOut/> : <Link href="user">Login</Link>}

    return(
        <header>
          <div>
          <div className="topNav">
            <Image src={'/images/logo.png'} alt="logo" width={80} height={80} />
            <nav>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/events">Events</Link></li>
                <li><Link href="about-us">About Us</Link></li>
                <li>{auth?.currentUser?.email ? <ButtonSingOut/> : <Link href="user">Login</Link>}</li>
              </ul>
            </nav>
          </div>
          <h3 className="page_title">Find your event</h3>
          </div>
      </header>
    )
}

