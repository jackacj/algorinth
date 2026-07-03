import random
from typing import Annotated
from abc import ABC, abstractmethod
from ..models.cell import Cell
from ..models.grid import Grid
from ..recorders.step_recorder import Step_Recorder

# Generator Object
class Generator(ABC):
    def __init__(self, seed: str | None = None, recorder: Step_Recorder = None):
        self.seed = seed
        self.rng = random.Random(seed)
        self.recorder = recorder or Step_Recorder(enabled = False)

    # Create a Grid & Record Event
    def super_create_grid(self, height: int, width: int, is_open: bool = False) -> Grid:
        self.recorder.record("Initialise", is_open = is_open)
        return Grid(height, width, is_open)

    # Create a Connection between Two Grid Cells & Record Event
    def super_create_path(self, cell_1: Cell, cell_2: Cell, grid: Grid) -> None:
        grid.create_path(cell_1, cell_2)
        self.recorder.record("Create Path", from_cell = cell_1.get_location(), to_cell = cell_2.get_location())

    # Remove a Connection between Two Grid Cells & Record Event
    def super_remove_path(self, cell_1: Cell, cell_2: Cell, grid: Grid) -> None:
        grid.remove_path(cell_1, cell_2)
        self.recorder.record("Remove Path", from_cell = cell_1.get_location(), to_cell = cell_2.get_location())

    # Set Cell's "Visited Status" as Visited & Record Event
    def super_set_visited(self, cell: Cell) -> None:
        cell.set_visited()
        self.recorder.record("Visit", cell = cell.get_location())

    # Combine Two Sets via Cells & Record Event
    def super_union(self, cell_1: Cell, cell_2: Cell, parent_map: dict[tuple[int], tuple[int]], grid: Grid):
        grid.union(cell_1, cell_2, parent_map)
        self.recorder.record("Union", set_a = cell_1.get_location, set_b = cell_2.get_location())
    
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