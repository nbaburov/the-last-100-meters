import styles from "@pages/Admin/css/AdminHomePage.module.css";
import {Link} from "react-router-dom";
import React from "react";

const AdminNavButtons = () => {

    return (
    <div className={styles.buttons}>
        <Link to="/admin/employees" className={styles.button}>
            Manage Employees
        </Link>
        <Link to="/admin/robots" className={styles.button}>
            Manage Robots
        </Link>
        <Link to="/demo/mapping" className={styles.button}>
            Manage Map
        </Link>
    </div>
    )
}
export default AdminNavButtons