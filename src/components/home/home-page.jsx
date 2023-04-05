import Link from "next/link";
import Image from "next/image";


export const HomePage = ({ data }) => {
  return (
    <div className="home_body">
      {data?.map((ev) => (
        <Link className='home_card' key={ev.id} href={`/events/${ev.id}`}x>
          <div className="home_img">
            <Image width={600} height={300} alt={ev.title} src={ev.image} />
          </div>
          <div className="home_content">
            <h2>{ev.title}</h2>
            <p>{ev.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );    
};
