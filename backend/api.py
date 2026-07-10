# FastAPI Imports
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
# Pandas for Data Processing
import pandas as pd
import json
# Maze Generation Logic
from .services.gen_service import generate_maze
# Database Logic
from .services.db_service import save_maze
# Models
from .models.maze import Maze
from .schemas.request import MazeGenerationRequest
from .schemas.response import MazeResponse, MazeSteps

app = FastAPI()

# Give Frontend IP Permission to Communicate w/ Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request a Maze from Frontend
# Response Model -> MazeResponse
@app.post("/generate", response_model = MazeResponse)
# Request Model -> MazeGenerationRequest 
async def generate_request(settings: MazeGenerationRequest):
    # Generate a Maze based on Request Settings -> Convert Request Body to Dictionary
    maze = generate_maze(settings)

    # Save Generated Maze to Database
    save_maze(maze)

    # Return a Maze Response
    return MazeResponse(
        maze_id = maze.id,
        settings = maze.settings,
        steps = MazeSteps(
            count = len(maze.steps),
            list = maze.steps
        ),
        final_maze = maze.final_maze.get_json()
    )