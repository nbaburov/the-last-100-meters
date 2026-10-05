/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styles from "@pages/Admin/css/AdminHomePage.module.css";
import React from "react";
import {IconButton} from "@material-tailwind/react";
import {EyeIcon} from "@heroicons/react/24/outline/index.js";

const AdminImportantEvents = ({ events, toLink }) => {

    const copyEvents = [...events]

    return (
        <section className={styles.events}>
            <h2>Important Events</h2>
            <div className={styles.eventsList}>
                {copyEvents.reverse().map(event => (
                    <div key={event.id} className={styles.eventItem}>
                        <div className={styles.eventTitle}>{event.title}</div>
                        <div className={styles.eventDate}>{event.date}</div>
                        <div style={{float: "right"}}>
                            <IconButton
                                variant="text"
                                size="sm"
                                onClick={() =>
                                    toLink(event.link)
                                }
                            >
                                <EyeIcon className="h-5 w-5 text-gray-900"/>
                            </IconButton>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default AdminImportantEvents