import random
from typing import Annotated

# Cell Object
class Cell():
    def __init__(self, paths: set[str] = {}, y: int = -1, x: int = -1, is_visited: bool = False):
        self.paths = paths
        self.loc_y = y
        self.loc_x = x
        self.is_visited = is_visited

    # Get the Cell's Paths
    def get_paths(self) -> set[str]:
        return self.paths
    
    # Set the Cell's Paths with New Path Set
    def set_paths(self, paths: set[str]) -> None:
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

    # Get a Cell's Location within a Grid
    def get_location(self) -> tuple:
        return (self.loc_y, self.loc_x)

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
                    paths = {'N','S','E','W'}

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

                    row.append(Cell(paths, y, x))
                else:
                    # Closed Grid Logic
                    row.append(Cell(set(), y, x))
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

    # Create a Connection between Two Grid Cells
    def modify_path(self, cell_1: Cell, cell_2: Cell, is_path: bool) -> None:
        # Find Direction between Cells
        y1, x1 = cell_1.get_location()
        y2, x2 = cell_2.get_location()
        dy, dx = (y2 - y1), (x2 - x1)
        match (dy, dx):
            case (-1, 0):
                # Cell_2 is North of Cell_1
                cell_1.set_path('N', is_path)
                cell_2.set_path('S', is_path)
            case (1, 0):
                # Cell_2 is South of Cell_1
                cell_1.set_path('S', is_path)
                cell_2.set_path('N', is_path)
            case (0, -1):
                # Cell_2 is West of Cell_1
                cell_1.set_path('W', is_path)
                cell_2.set_path('E', is_path)
            case (0, 1):
                # Cell 2 is East of Cell_1
                cell_1.set_path('E', is_path)
                cell_2.set_path('W', is_path)

    # Create a Connection between Two Grid Cells
    def create_path(self, cell_1: Cell, cell_2: Cell) -> None:
        self.modify_path(cell_1, cell_2, True)

    # Remove a Connection between Two grid Cells at a Specified Location
    def remove_path(self, cell_1: Cell, cell_2: Cell) -> None:
        self.modify_path(cell_1, cell_2, False)

    # Get a Cell's Neighbourhood, All or Just Unvisited
    def get_cell_neighbours(self, cell: Cell, just_unvisited: bool = False) -> list[Cell]:
        y, x = cell.get_location()
        height, width = self.get_dimensions()
        dirs = [(-1,0),(1,0),(0,-1),(0,1)]
        neighbours = []

        # Find Valid Neighbours
        for dy, dx in dirs:
            ny, nx = (y + dy), (x + dx)
            # Within Bounds
            if (0 <= ny < height) and (0 <= nx < width):
                neighbour_cell = self.get_cell(ny, nx)
                # Visited or Not
                if (not just_unvisited) or (neighbour_cell.get_visited() == False):
                    neighbours.append(neighbour_cell)
            
        return neighbours

# Generator Object
class Generator():
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

    # Generate an IterativeDFS Maze
    def generate_iterativeDFS_maze(self, height: int, width: int) -> Grid:
        # Generate Closed Grid
        grid = Grid(height, width)

        # Select Random Initial Cell
        rand_y = self.rng.randint(0, height - 1)
        rand_x = self.rng.randint(0, width - 1)
        rand_cell = grid.get_cell(rand_y, rand_x)

        # Mark as Visited, Add to Stack
        rand_cell.set_visited()
        stack = []
        stack.append(rand_cell)

        # Begin Backtracker w/ Stack
        while (len(stack) != 0):
       
            # Pop Current Cell
            curr_cell = stack.pop()

            # Check for Unvisited Neighbour
            curr_cell_unvisited_neighbour = self.pick_random_cell_neighbour(curr_cell, grid, True)

            # Check List
            if curr_cell_unvisited_neighbour == None:
                # If None, Backtrack
                continue
            else:
                # If Exists, Add Current back to Stack
                stack.append(curr_cell)

            # Create Connection Between Current & Random Neighbour
            grid.create_path(curr_cell, curr_cell_unvisited_neighbour)

            # Mark Neighbour as Visited and Add to Stack
            curr_cell_unvisited_neighbour.set_visited()
            stack.append(curr_cell_unvisited_neighbour)

        # Return Maze
        return grid

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

