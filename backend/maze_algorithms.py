import random
from typing import Annotated

# Cell Object
class Cell():
    def __init__(self, paths: set = set(), is_visited: bool = False):
        self.paths = paths
        self.is_visited = is_visited

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

def test_output(algorithm: str, seed: str = "No Seed"):
    return f"Maze w/ {algorithm}, Seeded w/ {seed}"

