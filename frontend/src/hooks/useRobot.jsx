import { useState } from "react";
import backEndClient from "@constants/backendClient.js";

const Uri = "robots";

export const useRobot = () => {
    const [robots, setRobots] = useState([]);
    const [robotById, setRobotById] = useState([])

    // Get robot by id to see more detail about the robot.
    const getRobotById = async (id) => {
        try {
            const response = await backEndClient.get(`${Uri}/${id}`);
            if (response) {
                setRobotById(response.data);
                return response.data;
            }
            console.log("Something went wrong");
            return [];
        } catch {
            // Setup a better error message.
            // For now I just put down an alert.

            alert("Something went wrong getting Robot.")
        }
    };

    // Get all robots.
    // Page variable might be added later to not overload the server.
    const getRobots = async (/* page */) => {
        try {
            const response = await backEndClient.get(Uri /* + page */)
            if (response) {
                setRobots(response.data)
                return response.data
            }
            console.log("Something went wrong");
            return [];
        } catch {
            // Set up a better error message.
            // For now, I just put down an alert.

            alert("Something went wrong getting Robots.")
        }
    }

    // Add robot.
    // No variables needed, all preset in the backend.
    const postRobot = async () => {
        try {
            // Response not being used right now.
            // Might be used later on.
            const response = await backEndClient.post(Uri);

            if(response)
                console.log(response)

        } catch (error) {
            console.log(error);
        }
    };

    // Update status of the robot so Employee can track what it's doing.
    const updateRobot = async (id, status) => {
        try {
            // Response not being used right now.
            // Might be used later on.
            const response = await backEndClient.put(Uri + id, {
                // Email and password on top for validation.
                status: status
            });

            if(response)
                console.log(response)

        } catch (error) {
            console.log(error);
        }
    };

    // Delete robot if robot has been destroyed.
    const deleteRobot = async (id) => {
        try {
            await backEndClient.delete(Uri + id)
        } catch (error) {
            console.log(error);
        }
    }

    return {
        robots,
        robotById,
        getRobotById,
        getRobots,
        postRobot,
        updateRobot,
        deleteRobot,
    };
};
