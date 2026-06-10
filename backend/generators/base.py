import random
from typing import Annotated
from abc import ABC, abstractmethod
from ..cell import Cell
from ..grid import Grid

# Generator Object
class Generator(ABC):
    def __init__(self, seed: str | None = None):
        self.seed = seed
        self.rng = random.Random(seed)
    
    # Pick a Random Cell within a Grid, All or Just Unvisited
    def pick_random_cell(self, grid: Grid, just_unvisited: bool = False) -> Cell:
        cells = [
            c for row in grid.cell_grid
            for c in row
            if (not c.get_visited()) or (not just_unvisited)
        ]
        return self.rng.choice(cells)

    # Pick a Random Neighbour of a Cell, All or Just Unvisited
    def pick_random_cell_neighbour(self, cell: Grid, grid: Grid, just_unvisited: bool = False) -> Cell | None:
        neighbours = grid.get_cell_neighbours(cell, just_unvisited)
        if neighbours == []:
            return None
        else:
            return self.rng.choice(neighbours)
        
    # Abstract Method for Maze Generation
    @abstractmethod
    def generate(self, height: int, width: int) -> Grid:
        pass