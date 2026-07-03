# FastAPI Imports
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
# Pandas for Data Processing
import pandas as pd
import json
# Maze Generation Logic
from .services.gen_service import generate_maze
from .generators.registry import GENERATORS
from .recorders.step_recorder import Step_Recorder
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
    maze_steps = maze.get_steps()

    # Return a Maze Response
    return MazeResponse(
        maze_id = maze.get_id(),
        settings = maze.get_settings(),
        steps = MazeSteps(
            count = len(maze_steps),
            list = maze_steps
        ),
        final_maze = maze.get_final_maze().get_json()
    )

# Debug: Request a Maze
@app.post("/generate_debug")
async def generate_debug_request(
    algorithm: str, 
    height: int, 
    width: int, 
    seed: str | None = None
):

    response = { "Algorithm": algorithm }
    if seed:
        response.update({ "Seed": seed })

    # Some Debug Logic
    try:
        generator_cls = GENERATORS[algorithm]
    except:
        return { "Error": "Unknown Algorithm" }
    
    recorder = Step_Recorder()
    generator = generator_cls(seed, recorder)
    grid = generator.generate(height, width)
    steps = recorder.get_steps()
    steps_output = { 
        "Count": len(steps),
        "List": steps 
        }

    response.update({ "Output ASCII": grid.create_grid_ascii() })
    response.update({ "Output Steps": steps_output })

    return response