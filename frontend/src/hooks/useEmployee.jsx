import { useState } from "react";
import backEndClient from "@constants/backendClient.js";

const Uri = "employees";

export const useEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [employeeById, setEmployeeById] = useState([])
    const [packages, setPackages] = useState([])

    // Gets Employee by id so we can more details about employee.
    const getEmployeeById = async (id) => {
        try {
            const response = await backEndClient.get(`${Uri}/${id}`);
            if (response) {
                setEmployeeById(response.data);
                return response.data;
            }
            console.log("Something went wrong");
            return [];
        } catch {
            // Set up a better error message.
            // For now, I just put down an alert.

            alert("Something went wrong getting Employee.")
        }
    };

    // Gets all Employees.
    // Later page function will get added to not get too many items at once.
    const getEmployees = async (/* page */) => {
        try {
            const response = await backEndClient.get(Uri/* + page */)
            if (response) {
                setEmployees(response.data)
                return response.data
            }
            console.log("Something went wrong");
            return [];
        } catch {
            // Set up a better error message.
            // For now, I just put down an alert.

            alert("Something went wrong getting Employee.")
        }
    }

    const getEmployeePackages = async (employeeId) => {
        try {
            const response = await backEndClient.get(`${Uri}/${employeeId}/packages`);
            if (response?.data) {
                setPackages(response.data);
                return response.data;
            }
            throw new Error("No data received");
        } catch (error) {
            console.error("Error fetching package:", error);
            throw error;
        }
    }

    // Creates an employee.
    // Figure out if either manager or employee has to make this account.
    const postEmployee = async (name, email, password, picture) => {
        try {
            // Response not being used right now.
            // Might be used later on.
            const response = await backEndClient.post(Uri, {
                email: email,
                password: password,
                picture: picture,
                name: name
            });

            if(response)
                console.log(response)

        } catch (error) {
            console.log(error);
        }
    };

    // Updates employee so employee can change settings.
    const updateEmployee = async (id, email, firstName, lastName, photo, floor, row, col) => {
        try {
            // Response not being used right now.
            // Might be used later on.
            const response = await backEndClient.put(`${Uri}/${id}`, {
                // Email and password on top for validation.
                firstName: firstName,
                lastName: lastName,
                email: email,
                photo: photo,
                endFloorIndex: floor,
                endRow: row,
                endCol: col
            });

            if(response)
                console.log(response)

        } catch (error) {
            console.log(error);
        }
    };

    // Deletes employee from system in case they get fired.
    const deleteEmployee = async (id) => {
        try {
            await backEndClient.delete(`${Uri} + ${id}`)
        } catch (error) {
            console.log(error);
        }
    }

    const getEmployeeByBarcodeId = async (barcodeId) => {
        try {
            const response = await backEndClient.get(`${Uri}/barcode/${barcodeId}`);
            if (response) {
                return response.data;
            }
            console.log("No employee found with this barcode ID");
            return null;
        } catch (error) {
            console.error("Error fetching employee by barcode ID:", error);
            throw error;
        }
    };

    return {
        employees,
        employeeById,
        packages,
        getEmployeeById,
        getEmployees,
        getEmployeePackages,
        postEmployee,
        updateEmployee,
        deleteEmployee,
        getEmployeeByBarcodeId,
    };
};
