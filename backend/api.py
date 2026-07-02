# FastAPI Imports
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
# Annotated Python Hints
from typing import Annotated
# UUIDs
import uuid
# Base for Data Bodies
from pydantic import BaseModel
# Pandas for Data Processing
import pandas as pd
import json
# Maze Generation Logic
from .generators.registry import GENERATORS
from .recorders.step_recorder import Step_Recorder

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
@app.post("/generate")
async def generate_request(settings: dict):
    # Create UUID for Request & Generated Maze
    maze_id = str(uuid.uuid4())

    # Unpack Request
    height = settings["rows"]
    width = settings["cols"]
    algorithm = settings["algorithm"]
    
    # Check for Seed
    if (settings["seed"] == ""):
        seed = None
    else:
        seed = settings["seed"]

    # Generate Maze
    generator_cls = GENERATORS[algorithm] 
    recorder = Step_Recorder()
    generator = generator_cls(seed, recorder)
    grid =  generator.generate(height, width)
    steps = recorder.get_steps()

    # Create Response
    response = {
        "maze_id": maze_id,
        "settings": {
            **settings
        }, 
        "steps": {
            "count": len(steps),
            "list": steps
        },
        "final_maze": grid.get_json()
    }

    return response

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