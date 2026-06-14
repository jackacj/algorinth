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
    console.log(JSON.stringify(settings))

    // Throw Error if Request Fails
    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    // Return Response Body as JSON
    return await response.json();
}