import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CatEvent({ data, pageName }) {
  return (
    <div className="cat_events_page">
      <h1>Events in {pageName}</h1>
      <div className="event_content">
        {data.map((ev) => (
          <Link className="cat_event_card" key={ev.id} href={`/events/${ev.city}/${ev.id}`} passHref>
            <Image className="image_card" width={300} height={200} alt={ev.title} src={ev.image} />
            <h3>{ev.title}</h3>
            <p>{ev.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
