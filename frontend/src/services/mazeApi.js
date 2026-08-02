// Base URL for Backend API - Localhost for Development
const API_BACKEND_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function generateMaze(settings) {
    // Create Request
    const response = await fetch(
        // Backend Maze Generation Endpoint
        `${API_BACKEND_BASE_URL}/mazes`,
        // Request Itself
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // Request Body
            body: JSON.stringify(settings)
        }
    );

    // Print Request Body
    console.log("mazeApi:", "REQUEST BODY:", settings)

    // Throw Error if Request Fails
    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    // Return Response Body as JSON
    return await response.json();
}

export async function requestMazeById(requestUuid) {
    // Create Request
    const response = await fetch(
        // Backend Maze Generation Endpoint
        `${API_BACKEND_BASE_URL}/mazes/${requestUuid}`,
        // Request Itself
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    // Throw Error if Request Fails
    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    // Return Response Body as JSON
    return await response.json();
}

export async function saveMaze(request) {
    // Create Request
    const response = await fetch(
        // Backend Maze Save Endpoint
        `${API_BACKEND_BASE_URL}/mazes/${request.maze_id}/save`,
        // Request Itself
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // Request Body
            body: JSON.stringify(request)
        }
    );

    // Throw Error if Request Fails
    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    // Return Response Body as JSON
    return await response.json();
}