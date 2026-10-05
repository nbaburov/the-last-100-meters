/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import styles from "./BackToPreviousPage.module.css";
import {Link, useNavigate} from "react-router-dom";
import React from "react";

const BackToPreviousPage = () => {

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Goes back to the previous page
    };

    return (
        <div className={styles.buttons} style={{position:"fixed", left:5, top:100, zIndex:100}}>
            <button onClick={handleGoBack} className={styles.button}>
                Back
            </button>
        </div>
    )
}

export default BackToPreviousPage