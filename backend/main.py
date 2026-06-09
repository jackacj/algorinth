# FastAPI Imports
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
# Annotated Python Hints
from typing import Annotated
# Base for Data Bodies
from pydantic import BaseModel
# Pandas for Data Processing
import pandas as pd
import json
# Maze Generation Logic
import maze_algorithms as ma

app = FastAPI()

# Give Frontend IP Permission to Communicate w/ Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request a Maze
@app.get("/generate")
async def generate_request(algorithm: str, height: int, width: int, seed: str | None = None):
    response = { "Algorithm": algorithm }
    if seed:
        response.update({ "Seed": seed })
    response.update({ "Output": ma.test_output(algorithm, seed)})
    # Some Debug Logic
    grid = ma.Grid(height, width)
    grid.create_path(grid.get_cell(5, 5), grid.get_cell(5, 6))
    ascii_rows = ma.create_grid_ascii(grid)
    response.update({ "Output ASCII": ascii_rows} )
    return response