# UUIDs
import uuid
from uuid import UUID
# Models
from .grid import Grid

# Maze Object
class Maze():
    def __init__(self, settings: dict, steps: list, final_maze: Grid, maze_id: UUID | None = None):
        # No Getters -> Purely a Data Structure
        if (maze_id == None):
            self.id: UUID = uuid.uuid4()
        else:
            self.id: UUID = maze_id
        self.settings: dict = settings
        self.steps: list = steps
        self.final_maze: Grid = final_maze