from typing import Annotated
from .cell import Cell

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

    # Get a Cell's Neighbour, Specified w/ Direction
    def get_cell_neighbour(self, cell: Cell, direction: chr) -> Cell | None:
        y, x = cell.get_location()
        height, width = self.get_dimensions()
        dirs = {
            "N": (-1,0),
            "S": (1,0),
            "E": (0,1),
            "W": (0,-1)
        }
        dy, dx = dirs[direction]
        ny, nx = (y + dy), (x + dx)

        # Out of Bounds
        if ny < 0 or ny >= height or nx < 0 or nx >= width:
            return None
        
        return self.get_cell(ny, nx)

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
    
    # Check if Every Cell within the Grid has been "Visited"
    def get_all_visited(self) -> bool:
        return all(
            cell.get_visited()
            for row in self.cell_grid
            for cell in row
        )
    
    # Find Cell Set Coordinates -> Union-Find Datastructure
    def find(self, cell: Cell, parent_map: dict[tuple[int], tuple[int]]) -> tuple:
        y, x = cell.get_location()
        if parent_map[(y, x)] != (y, x):
            py, px = parent_map[(y, x)]
            parent_map[(y, x)] = self.find(self.get_cell(py, px), parent_map)
        return parent_map[(y, x)]

    # Combine Two Sets via Cells -> Union-Find Datastructure
    def union(self, cell_1: Cell, cell_2: Cell, parent_map: dict[tuple[int], tuple[int]]) -> None:
        root_coords_1 = self.find(cell_1, parent_map)
        root_coords_2 = self.find(cell_2, parent_map)
        if (root_coords_1 != root_coords_2):
            parent_map[root_coords_2] = root_coords_1
    
    # Create ASCII of a Grid
    def create_grid_ascii(self) -> tuple:
        height, width = self.get_dimensions()
        tops = []
        mids = []

        for y in range(height):
            # Top Wall
            top = ""
            mid = ""
            for x in range(width):
                cell = self.get_cell(y, x)
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
            bottom += "   " if 'S' in self.get_cell(height - 1, x).get_paths() else "---"
        bottom += "+"

        # Assemble into Rows
        ascii_rows = []
        for i in range(len(tops)):
            ascii_rows.append(tops[i])
            ascii_rows.append(mids[i])
        ascii_rows.append(bottom)
        return ascii_rows

    # Print a Grid as ASCII for Debugging
    def print_grid_ascii(self):
        ascii_rows = self.create_grid_ascii()

        for row in ascii_rows:
            print(row)

    # Return a JSON Serialisable Grid State
    def to_json(self) -> list[list[dict[str, any]]]:
        # Return a 2D Array of Cell JSON States
        return [
            [cell.to_json() for cell in row]
            for row in self.cell_grid
        ]
    

    # Turn a JSON Grid State into a Grid Object
    # Use Decorator to Call without Instance
    @classmethod
    def from_json(cls, data):
        # Extract Dimenions & Create Empty Grid
        height = len(data)
        width = len(data[0])
        grid = Grid(height, width)

        # For Each Cell Json, Create Cell Object & Insert in Grid
        for row in data:
            for cell_json in row:
                cell = Cell.from_json(cell_json)
                cell_y, cell_x = cell.get_location()
                grid.set_cell(cell_y, cell_x, cell)

        # Return Grid State
        return grid