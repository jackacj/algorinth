import random
from typing import Annotated

# Cell Object
class Cell():
    def __init__(self, paths: set = set(), is_visited: bool = False):
        self.paths = paths
        self.is_visited = is_visited

    # Get the Cell's Paths
    def get_paths(self) -> set:
        return self.paths
    
    # Set the Cell's Paths with New Path Set
    def set_paths(self, paths: set) -> None:
        self.paths = paths

    # Set an Individual Cell Path as 'True' (Connected) or 'False' (Not Connected)
    def set_path(self, path: chr, is_path: bool) -> None:
        # Add Path when Absent
        if (is_path) and (path not in self.paths):
            self.paths.add(path)
        # Remove Path when Present
        elif (not is_path) and (path in self.paths):
            self.paths.discard(path)

    # Get Cell's "Visited Status"
    def get_visited(self) -> bool:
        return self.is_visited
    
    # Set Cell's "Visited Status" as Visited
    def set_visited(self) -> None:
        self.is_visited = True

# Grid Object
class Grid():
    def __init__(self, height: int, width: int, is_open: bool = False):
        self.height = height
        self.width = width

        # Create Grid & Populate w/ Cells
        cell_grid = []
        for y in range(height):
            row = []
            for x in range(width):
                if is_open:
                    # Open Grid Logic
                    paths = set('N','S','E','W')

                    if y == 0:
                        # Top Row -> Remove North Connection
                        paths.discard('N')
                    if y == height - 1:
                        # Bottom Row -> Remove South Connection
                        paths.discard('S')
                    if x == 0:
                        # First in Row -> Remove West Connection
                        paths.discard('W')
                    if x == width - 1:
                        # Last in Row -> Remove East Connection
                        paths.discard('E')

                    row.append(Cell(paths))
                else:
                    # Closed Grid Logic
                    row.append(Cell())
            cell_grid.append(row)
        self.cell_grid = cell_grid

    # Get the Grid's Dimensions
    def get_dimensions(self) -> tuple:
        return (self.height, self.width)
    
    # Get a Grid's Cell via Coordinates
    def get_cell(self, y: int, x: int) -> Cell:
        return self.cell_grid[y][x]
    
    # Set a Grid's Cell via Coordinates
    def set_cell(self, y: int, x: int, cell: Cell) -> None:
        self.cell_grid[y][x] = cell

# Test Response
def test_output(algorithm: str, seed: str = "No Seed") -> str:
    return f"Maze w/ {algorithm}, Seeded w/ {seed}"

