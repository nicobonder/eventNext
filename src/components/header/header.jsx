import Link from "next/link"
import Image from "next/image"

export const Header = () => {

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
              </ul>
            </nav>
          </div>
          <h3 className="page_title">Find your event</h3>
          </div>
      </header>
    )
}

