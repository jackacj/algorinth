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
        height, width = grid.get_dimensions()
        while(True):
            rand_y = self.rng.randint(0, height - 1)
            rand_x = self.rng.randint(0, width - 1)
            rand_cell = grid.get_cell(rand_y, rand_x)
            if (not just_unvisited) or (rand_cell.get_visited == False):
                return rand_cell

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