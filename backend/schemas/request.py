# Base for Data Bodies
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from uuid import UUID
# Domain Models
from models.grid import Grid
from models.maze import Maze

# Maze Gen Request Data Model
class MazeGenerationRequest(BaseModel):
    rows: int
    cols: int
    algorithm: str
    seed: Optional[str] = None

# Maze Save Request Data Model
class MazeSaveRequest(BaseModel):
    maze_id: UUID
    settings: Dict
    steps: List
    final_maze: List[List[Dict[str, Any]]]

    # Create Domain Model from Save Request
    def to_domain(self) -> Maze:
        return Maze(
            maze_id = self.maze_id,
            settings = self.settings,
            steps = self.steps,
            final_maze = Grid.from_json(self.final_maze),
            saved = False
        )