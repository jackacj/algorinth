# Base for Data Bodies
from pydantic import BaseModel
from typing import List, Dict, Any

# Seperate Model for the Maze Steps
class MazeSteps(BaseModel):
    count: int
    list: List[Dict[str, Any]]

# Maze Response Data Model
class MazeResponse(BaseModel):
    maze_id: str
    settings: Dict
    steps: MazeSteps
    final_maze: List[List[Dict[str, Any]]]