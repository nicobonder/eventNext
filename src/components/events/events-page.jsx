import React from 'react'
import Link from 'next/link';
import Image from 'next/image'

export default function AllEvents({ data }) {
  return (
    <div className='events_page'>
    <h1>Events Page</h1>
    <div className='events_page_div'>
      {data.map((ev) => (
          <Link className='event_card' key={ev.id} href={`/events/${ev.id}`}>
            <Image className='events_img' width={400} height={400} alt={ev.title} src={ev.image} />
            <h2>{ev.title}</h2>
          </Link>
      ))}
    </div>     
  </div>
  )
}
