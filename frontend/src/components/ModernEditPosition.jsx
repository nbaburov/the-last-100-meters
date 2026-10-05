/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import styles from './EditPosition.module.css'
import {useEmployee} from "@hooks/useEmployee.jsx";
import {useMap} from "@hooks/useMap.jsx";
import ModernFloorPosition from "@components/Mapping/ModernFloorPosition.jsx";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

function ModernEditPosition(props)  {
    const [showModal, setShowModal] = useState();
    const { updateEmployee } = useEmployee();
    const { map, getMap } = useMap();

    const [floor, setFloor] = useState(0);
    const [row, setRow] = useState(0);
    const [col, setCol] = useState(0);

    const [currentFloor, setCurrentFloor] = useState(0);

    const [maxFloor, setMaxFloor] = useState(0);
    const [maxCol, setMaxCol] = useState(0);

    const [newFloor, setNewFloor] = useState(map[floor])

    useEffect(() => {
        setShowModal(props.showAlert)
    }, [props.showAlert]);

    useEffect(() => {
        getMap()
    }, []);

    useEffect(() => {
        if(map.length !== 0)
        {
            setMaxFloor(map.length)
            setMaxCol(map[0][0].length)
        }
    }, [map]);

    useEffect(() => {
        if(props.employee != null) {
            setCurrentFloor(props.employee.endFloorIndex)
            setFloor(props.employee.endFloorIndex)
            setRow(props.employee.endRow)
            setCol(props.employee.endCol)
        }
    }, [showModal])

    useEffect(() => {
        if(map[floor]?.length)
        {
            console.log(currentFloor)
            console.log(floor)
            const newFloor = JSON.parse(JSON.stringify(map[floor]))
            if(floor === currentFloor)
            {
                newFloor[row][col] = "U"
            }
            setNewFloor(newFloor)
        }
    }, [floor, row, col]);

    if(props.employee == null)
    {
        return;
    }

    let employee = props.employee

    const handleSubmit = (event) => {
        event.preventDefault()

        updateEmployee(employee.id, employee.email, employee.firstName, employee.lastName, employee.photo, floor, row, col)
            .then(props.setPosition(floor, row, col))

        props.setAlert(false)
    };

    const handleCancel = () => {
        props.setAlert(false)
    };

    const handlePositionUpdate = (floor, row, col) => {
        setCurrentFloor(floor)
        setFloor(floor)
        setRow(row)
        setCol(col)
        console.log(floor, row, col)
    }

    const handleUp = () => {
        if(floor < maxFloor-1)
            setFloor(floor+1)
    }

    const handleDown = () => {
        if(floor > 0)
            setFloor(floor-1)
    }

    return (
        <div>
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContainer}>
                        <div className={styles.modalHeader}>
                            <h3>Change Employee Position here!</h3>
                        </div>
                        <div className={styles.modalBody}>
                            <p>Changing for: {props.employee.firstName} {props.employee.lastName}</p>
                            <p>Current Floor: {floor}</p>
                        </div>
                        <div>
                            <button className={styles.btn + ' ' + styles.btnLogin} style={{marginRight: 40}} type={"button"}
                                    onClick={handleUp}><IoIosArrowUp /></button>
                            <button className={styles.btn + ' ' + styles.btnLogin} type={"button"}
                                    onClick={handleDown}><IoIosArrowDown /></button>
                        </div>
                        <br/>
                        <div className="flex flex-col gap-4">
                            <ModernFloorPosition
                                floorIndex={floor}
                                floor={newFloor}
                                gridSize={maxCol}
                                onPositionUpdate={handlePositionUpdate}
                            />
                        </div>
                        <form className={styles.modalBody}
                              onSubmit={handleSubmit}>
                            <div className={styles.modalFooter}>
                                <button className={styles.btn + ' ' + styles.btnLogin} type={"submit"}>
                                    Save
                                </button>
                                <button className={styles.btn + ' ' + styles.btnGoBack} type={"button"}
                                        onClick={handleCancel}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModernEditPosition;
