# Base for Data Bodies
from pydantic import BaseModel
from typing import Optional

# Maze Gen Request Data Model
class MazeGenerationRequest(BaseModel):
    rows: int
    cols: int
    algorithm: str
    seed: Optional[str] = None