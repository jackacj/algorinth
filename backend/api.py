# FastAPI Imports
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
# Pandas for Data Processing
import pandas as pd
import json
# Maze Generation Logic
from .services.gen_service import generate_maze
# Database Logic
from .services.db_service import save_maze, get_maze_by_uuid
# Models
from .models.maze import Maze
from .schemas.request import MazeGenerationRequest
from .schemas.response import MazeResponse

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

    # Save Generated Maze to Database
    save_maze(maze)

    # Return a Maze Response
    return MazeResponse.from_maze(maze)

# Get a Specific Maze w/ UUID
# Response Model -> MazeResponse
@app.get("/mazes/{uuid}", response_model = MazeResponse)
async def get_maze_by_id(uuid: str):
    # Get Maze Object for UUID -> Could Be Empty
    maze = get_maze_by_uuid(uuid)
    
    # Return a Maze Response
    return MazeResponse.from_maze(maze)