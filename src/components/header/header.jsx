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
              <Link href="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
