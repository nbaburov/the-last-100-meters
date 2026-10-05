/* eslint-disable react/prop-types */
import React, {useEffect, useState} from 'react';
import styles from './EditPosition.module.css'
import {useNavigate} from "react-router-dom";
import {useEmployee} from "@hooks/useEmployee.jsx";
import {useMap} from "@hooks/useMap.jsx";
import {dictCharToColor} from "@constants/map.js";


function EditPosition(props)  {
    const [showModal, setShowModal] = useState();
    const { updateEmployee } = useEmployee();
    const { map, getMap } = useMap();

    const [floor, setFloor] = useState(0);
    const [row, setRow] = useState(0);
    const [col, setCol] = useState(0);

    const [floorValid, setFloorValid] = useState(true)
    const [rowValid, setRowValid] = useState(true)
    const [colValid, setColValid] = useState(true)

    const [maxFloor, setMaxFloor] = useState(0);
    const [maxRow, setMaxRow] = useState(0);
    const [maxCol, setMaxCol] = useState(0);

    const pattern= /^\d+$/

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
            setMaxRow(map[0].length)
            setMaxCol(map[0][0].length)
        }
    }, [map]);

    useEffect(() => {
        if(props.employee != null) {
            setFloor(props.employee.endFloorIndex)
            setRow(props.employee.endRow)
            setCol(props.employee.endCol)
        }
    }, [showModal])

    if(props.employee == null)
    {
        return;
    }

    let employee = props.employee

    const handleSubmit = (event) => {
        event.preventDefault()

        if(!floorValid || !colValid || !rowValid)
        {
            alert("Please make all boxes valid.")
            return;
        }

        updateEmployee(employee.id, employee.email, employee.firstName, employee.lastName, employee.photo, floor, row, col)
            .then(props.setPosition(floor, row, col))

        props.setAlert(false)
    };

    const handleCancel = () => {
        props.setAlert(false)
    };

    const handleFloorChange = e => {
        let value = e.target.value

        if(value >= maxFloor || maxFloor < 0)
        {
            setFloorValid(false)
        }
        else{
            if(pattern.test(value))
                setFloorValid(true)
            else{
                setFloorValid(false)
            }
        }
        setFloor(value)
    }

    const handleRowChange = e => {
        let value = e.target.value
        if(value >= maxRow || maxRow < 0)
        {
            setRowValid(false)
        }
        else{
            if(pattern.test(value))
                setRowValid(true)
            else{
                setRowValid(false)
            }
        }
        setRow(value)
    }

    const handleColChange = e => {
        let value = e.target.value
        if(value >= maxCol || maxCol < 0)
        {
            setColValid(false)
        }
        else{
            if(pattern.test(value))
                setColValid(true)
            else{
                setColValid(false)
            }
        }
        setCol(e.target.value)
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
                            <p>Enter a positive number.</p>
                        </div>
                        <form className={styles.modalBody}
                              onSubmit={handleSubmit}>
                            <div style={{display: "table", width:"300px"}}>
                                <p style={{display: "table-row"}}>
                                    <label style={{display: "table-cell"}}>Floor</label>
                                    <input
                                        style={{display: "table-cell", borderColor: floorValid ? 'limegreen' : 'red'}}
                                           className={styles.inputField} type="text"
                                           pattern="\d+" required title="Enter Positive Number"
                                           value={floor}
                                           onChange={handleFloorChange}
                                    />
                                </p>
                                <p style={{display: "table-row"}}>
                                    <label style={{display: "table-cell"}}>Row</label>
                                    <input
                                        style={{display: "table-cell", borderColor: rowValid ? 'limegreen' : 'red'}}
                                           className={styles.inputField} type="text"
                                           pattern="\d+" required title="Enter Positive Number"
                                           value={row}
                                           onChange={handleRowChange}/>
                                </p>
                                <p style={{display: "table-row"}}>
                                    <label style={{display: "table-cell"}}>Column</label>
                                    <input
                                        style={{display: "table-cell", borderColor: colValid ? 'limegreen' : 'red'}}
                                           className={styles.inputField} type="text"
                                           pattern="\d+" required title="Enter Positive Number"
                                           value={col}
                                           onChange={handleColChange}/>
                                </p>
                            </div>
                            <div className={styles.modalFooter}>
                                <button className={styles.btn + ' ' + styles.btnLogin} type={"submit"}>
                                    Save
                                </button>
                                <button className={styles.btn + ' ' + styles.btnGoBack} type={"button"} onClick={handleCancel}>
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

export default EditPosition;
