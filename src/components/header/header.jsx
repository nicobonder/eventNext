import Link from "next/link";
import Image from "next/image";
import logo from "../../../assets/NEXT.png";

export const Header = () => {
  return (
    <header>
      <div className="topNav">
        <Link className="img_link" href="/">
          <Image
            className="logoImg"
            src={logo}
            alt="logo"
            width={100}
            height={100}
          />
        </Link>
        <h3 className="page_title">Find your event</h3>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/events">Events</Link>
            </li>
            <li>
              <Link href="about-us">About Us</Link>
            </li>
            <li>
              <Link className="account_icon" href="/account">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" preserveAspectRatio="xMidYMid meet"
                
                 style={{ color: 'black' }}>
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7
                   48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 
                   0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                </svg>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
