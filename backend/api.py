# FastAPI Imports
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
# UUID Type
from uuid import UUID
# Maze Generation Logic
from services.gen_service import generate_maze
# Database Logic
from database.repository import save_maze, get_maze
# Models
from models.maze import Maze
from schemas.request import MazeGenerationRequest, MazeSaveRequest
from schemas.response import MazeResponse

app = FastAPI()

# Give Frontend IP Permission to Communicate w/ Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

## '/mazes' Endpoints

# Request to Generate Maze from Frontend
# Response Model -> MazeResponse
@app.post("/mazes", response_model = MazeResponse)
# Request Model -> MazeGenerationRequest 
async def maze_generate_request(settings: MazeGenerationRequest):
    # Generate a Maze based on Request Settings -> Convert Request Body to Dictionary
    maze = generate_maze(settings)

    # Return a Maze Response
    return MazeResponse.from_domain(maze)

# Get a Specific Maze w/ UUID
# Response Model -> MazeResponse
@app.get("/mazes/{id}", response_model = MazeResponse)
async def maze_retrieval_request(id: UUID):
    # Get Maze Object for UUID -> Could Be Empty
    maze = get_maze(id)

    # If Maze is Not Found, Return 404 Exception
    if maze is None:
        raise HTTPException(
            status_code = 404,
            detail = "Maze not found."
        )
    
    # Return a Maze Response
    return MazeResponse.from_domain(maze)

# Save a Specific Maze
# Response Model -> MazeResponse
@app.post("/mazes/{id}/save", response_model = MazeResponse)
async def maze_save_request(id: UUID, maze_data: MazeSaveRequest):
    # Get Maze Object from Request
    maze = maze_data.to_domain()

    # Save to Database
    saved_maze = save_maze(maze)

    # Return Updated Maze State in Maze Response
    return MazeResponse.from_domain(saved_maze)