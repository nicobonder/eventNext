import React from "react";
import Image from "next/image";
import Link from "next/link";

function convertirString(str) {
  if (str.includes('-')) {
    // Si el string contiene un guión, separar las palabras y capitalizarlas
    let palabras = str.split('-');
    for (let i = 0; i < palabras.length; i++) {
      palabras[i] = palabras[i].charAt(0).toUpperCase() + palabras[i].slice(1);
    }
    return palabras.join(' ');
  } else {
    // Si el string no contiene un guión, capitalizar la primera letra
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

export default function CatEvent({ data, pageName }) {
  const pageTitle = convertirString(pageName);
  return (
    <div className="cat_events_page">
      <h1>Events in {pageTitle}</h1>
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
