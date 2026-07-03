# UUIDs
import uuid
# Models
from .grid import Grid

# Maze Object
class Maze():
    def __init__(self, settings: dict, steps: list, final_maze: Grid):
        self.id: str = str(uuid.uuid4())
        self.settings: dict = settings
        self.steps: list = steps
        self.final_maze: Grid = final_maze

    # Return ID
    def get_id(self) -> str:
        return self.id
    
    # Return Settings Dictionary
    def get_settings(self) -> dict:
        return self.settings
    
    # Return Steps Dictionary
    def get_steps(self) -> list:
        return self.steps
    
    # Return JSON Serialisable Final Maze
    def get_final_maze(self) -> Grid:
        return self.final_maze

    
