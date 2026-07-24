# Base for Data Bodies
from pydantic import BaseModel
from typing import List, Dict, Any
from ..models.maze import Maze

# Seperate Model for the Maze Steps
class MazeSteps(BaseModel):
    count: int
    list: List[Dict[str, Any]]

    # Create Model from Backend Steps
    @classmethod
    def from_steps(cls, steps: List) -> "MazeSteps":
        return cls(
            count = len(steps),
            list = steps
        )

# Maze Response Data Model
class MazeResponse(BaseModel):
    maze_id: str
    settings: Dict
    steps: MazeSteps
    final_maze: List[List[Dict[str, Any]]]

    # Create Model from Backend Maze Model
    @classmethod
    def from_maze(cls, maze: Maze) -> "MazeResponse":
        return cls(
            maze_id = maze.id,
            settings = maze.settings,
            steps = MazeSteps.from_steps(maze.steps),
            final_maze = maze.final_maze.to_json()
        )