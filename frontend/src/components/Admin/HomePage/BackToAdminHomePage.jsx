/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import styles from "@pages/Admin/css/BackToAdminHomePage.module.css";
import {Link} from "react-router-dom";
import React from "react";

const BackToAdminHomePage = () => {

    return (
        <div className={styles.buttons} style={{float:"left", marginRight:0}}>
            <Link to="/admin" className={styles.button}>
                Back
            </Link>
        </div>
    )
}

export default BackToAdminHomePage