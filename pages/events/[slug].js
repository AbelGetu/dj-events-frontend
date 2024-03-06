import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import styles from "@/styles/Event.module.css"
import Link from "next/link"
import Image from "next/image"
import {FaPencilAlt, FaTimes} from 'react-icons/fa'

export default function EventPage({evt}) {

  const deleteEvent = (e) => {
    console.log('delete')
  }
  return (
    <Layout>
        <div className={styles.event}>
          <div className={styles.controls}>
            <Link href={`/events/edit/${evt.attributes.id}`}>
              <a>
                <FaPencilAlt /> Edit Event
              </a>
            </Link>
            <a href="#" className={styles.delete} onClick={deleteEvent}>
              <FaTimes /> Delete Event
            </a>
          </div>

          <span>
            {evt.attributes.date} at {evt.attributes.time}
          </span>
          <h1>{evt.attributes.name}</h1>
          {evt.attributes.image && (
            <div cl assName={styles.image}>
              {/* <Image src={evt.attributes.image} width={960} height={600}/> */}
            </div>
          )}


          <h3>Performers: </h3>
          <p>{evt.performers}</p>
          <h3>Description:</h3>
          <p>{evt.description}</p>
          <h3>Venue: {evt.venue}</h3>
          <p>{evt.address}</p>
          
          <Link href="/events">
            <a className={styles.back}>{`<`} Go Back</a>
          </Link>
        </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  const paths = events.data.map(evt => ({
    params: {slug: evt.attributes.slug}
  }))

  return {
      paths,
      fallback: true
  }
}
export async function getStaticProps({params: {slug}}) {
  const res = await fetch(`${API_URL}/api/events/${slug}`)
  const events = await res.json()
  return {
    props: {
      evt: events[0],
      revalidate: 1
    }
  }
}

// export async function getServerSideProps({query: {slug}}) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`)
//   const events = await res.json()
//   return {
//     props: {
//       evt: events[0]
//     }
//   }
// }
