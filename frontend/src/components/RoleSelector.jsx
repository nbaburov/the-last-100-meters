import React, { useState } from 'react';
import styles from './RoleSelector.module.css'

function RoundDropdown({ role }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(role);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
    };

    return (
        <div className={styles.dropdownContainer}>
            <div className={styles.dropdownBtn} onClick={toggleDropdown}>
                &#x25BC;
                <span style={{textAlign:"left"}}>{selectedItem}</span>
            </div>

            {isOpen && (
                <div className={styles.dropdownMenu}>
                    <div className={styles.dropdownItem} onClick={() => handleSelect('Admin')}>Admin</div>
                    <div className={styles.dropdownItem} onClick={() => handleSelect('Employee')}>Employee</div>
                </div>
            )}
        </div>
    );
};

export default RoundDropdown;
