import { useState } from "react";
import backEndClient from "@constants/backendClient.js";

const Uri = "packages/";

export const usePackage = () => {
    const [packageList, setPackageList] = useState(null);
    const [packageById, setPackageById] = useState(null);

    // Get package by id
    const getPackageById = async (id) => {
        try {
            const response = await backEndClient.get(`${Uri}${id}`);
            if (response?.data) {
                setPackageById(response.data);
                return response.data;
            }
            throw new Error("No data received");
        } catch (error) {
            console.error("Error fetching package:", error);
            throw error;
        }
    };

    // Create package from barcode
    const createPackageFromBarcode = async (barcode) => {
        try {
            const response = await backEndClient.post(`${Uri}${barcode}`);
            if (response?.data) {
                return response.data;
            }
            throw new Error("No data received");
        } catch (error) {
            console.error("Error creating package:", error.response?.data);
            throw error;
        }
    };

    // Update package status to arrived
    const updatePackageArrived = async (id) => {
        try {
            await backEndClient.put(`${Uri}${id}`);
        } catch (error) {
            console.error("Error updating package:", error);
            throw error;
        }
    };

    // Delete package
    const deletePackage = async (id) => {
        try {
            await backEndClient.delete(`${Uri}${id}`);
        } catch (error) {
            console.error("Error deleting package:", error);
            throw error;
        }
    };

    return {
        packageList,
        packageById,
        getPackageById,
        createPackageFromBarcode,
        updatePackageArrived,
        deletePackage,
    };
};
