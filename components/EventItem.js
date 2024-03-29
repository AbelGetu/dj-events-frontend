import Link from "next/link"
import Image from "next/image"
import styles from "@/styles/EventItem.module.css"

export default function EventItem({evt}) {
    // console.log('evt', evt)
    console.log(evt.image.data.attributes.formats.thumbnail.url)
  return (
    <div className={styles.event}>
        <div className={styles.img}>
            <Image src={evt.image ? `${evt.image.data.attributes.formats.thumbnail.url}` : '/images/event-default.png'} width={170} height={100} alt={evt.slug} />
        </div>
        <div className={styles.info}>
            <span>{evt.date} at {evt.time}</span>
            <h3>{evt.name}</h3>
        </div>

        <div className={styles.link}>
            <Link href={`/events/${evt.slug}`}>
                <a className="btn">Details</a>
            </Link>
        </div>
    </div>
  )
}
