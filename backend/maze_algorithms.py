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

# Create ASCII of a Grid
def create_grid_ascii(grid: Grid) -> tuple:
    height, width = grid.get_dimensions()
    tops = []
    mids = []

    for y in range(height):
        # Top Wall
        top = ""
        mid = ""
        for x in range(width):
            cell = grid.get_cell(y, x)
            top += "+"
            top += "   " if 'N' in cell.get_paths() else "---"
            
            # Left Wall or Space
            mid += " " if 'W' in cell.get_paths() else "|"
            mid += "   "
        # Rightmost Wall
        top += "+"
        mid += "|"
        tops.append(top)
        mids.append(mid)

    # Bottom Wall for Last Row
    bottom = ""
    for x in range(width):
        bottom += "+"
        bottom += "   " if 'S' in grid.get_cell(height - 1, x).get_paths() else "---"
    bottom += "+"

    # Assemble into Rows
    ascii_rows = []
    for i in range(len(tops)):
        ascii_rows.append(tops[i])
        ascii_rows.append(mids[i])
    ascii_rows.append(bottom)
    return ascii_rows

# Print a Grid as ASCII for Debugging
def print_grid_ascii(grid: Grid):
    ascii_rows = create_grid_ascii(grid)

    for row in ascii_rows:
        print(row)

# Test Response
def test_output(algorithm: str, seed: str = "No Seed") -> str:
    return f"Maze w/ {algorithm}, Seeded w/ {seed}"

