// Base URL for Backend API - Localhost for Development
const API_BACKEND_BASE_URL = "http://localhost:8000"

export async function generateMaze(settings) {
    // Create Request
    const response = await fetch(
        // Backend Maze Generation Endpoint
        `${API_BACKEND_BASE_URL}/generate`,
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

export async function requestMazeById(request) {
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
            body: JSON.stringify(request)
        }
    );

    // Print Request Body
    console.log(JSON.stringify(request))

    // Throw Error if Request Fails
    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    // Return Response Body as JSON
    return await response.json();
}