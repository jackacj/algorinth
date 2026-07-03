# UUIDs
import uuid
# Models
from .grid import Grid

# Maze Object
class Maze():
    def __init__(self, settings: dict, steps: list, final_maze: Grid):
        # No Getters -> Purely a Data Structure
        self.id: str = str(uuid.uuid4())
        self.settings: dict = settings
        self.steps: list = steps
        self.final_maze: Grid = final_maze