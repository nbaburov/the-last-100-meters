import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styles from './css/AdminHomePage.module.css'
import {EyeIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline/index.js";
import {IconButton, Input} from "@material-tailwind/react";
import AdminNavButtons from "@components/Admin/HomePage/AdminNavButtons.jsx";
import AdminImportantEvents from "@components/Admin/HomePage/AdminImportantEvents.jsx";

const AdminHomePage = () => {
    // Dummy data for important events
    const events = [
        { id: 1, title: 'Jane Doe`s Package Being Delivered', date: '2024-12-10', link: '../employee/package/2' },
        { id: 2, title: 'Jane Doe`s Package Arrived', date: '2024-12-10', link: '../employee/package/2' },
        { id: 3, title: 'Robot #4 Error', date: '2024-12-11', link: 'robots/4' },
    ];

    const navigate = useNavigate()

    function toLink(link) {
        navigate(link)
    }

    return (
        <div className={styles.adminHomepage}>
            {/* Header Section */}
            <header className={styles.header}>
                <h1>Admin Dashboard</h1>
            </header>

            <AdminNavButtons/>
            <AdminImportantEvents events={events} toLink={toLink}/>
        </div>
    );
};

export default AdminHomePage;
