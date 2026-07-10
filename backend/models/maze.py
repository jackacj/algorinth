# UUIDs
import uuid
# Models
from .grid import Grid

# Maze Object
class Maze():
    def __init__(self, settings: dict, steps: list, final_maze: Grid, maze_uuid: str | None = None):
        # No Getters -> Purely a Data Structure
        if (maze_uuid == None):
            self.id: str = str(uuid.uuid4())
        else:
            self.id: str = maze_uuid
        self.settings: dict = settings
        self.steps: list = steps
        self.final_maze: Grid = final_maze