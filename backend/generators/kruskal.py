from .base import Generator
from ..cell import Cell
from ..grid import Grid

class Kruskal_Generator(Generator):
    
    # Generate an Kruskal's Maze
    def generate(self, height: int, width: int) -> Grid:
        # Generate Closed Grid
        grid = Grid(height, width)

        # Populate a "Parent Mapping" with Cell Coords pointing to themselves
        parent_map = {}
        for y in range(height):
            for x in range(width):
                parent_map[(y, x)] = (y, x)

        # Set Up Union-Find Datastructure
        def find(cell: Cell) -> tuple:
            y, x = cell.get_location()
            if parent_map[(y, x)] != (y, x):
                py, px = parent_map[(y, x)]
                parent_map[(y, x)] = find(grid.get_cell(py, px))
            return parent_map[(y, x)]

        def union(cell_1: Cell, cell_2: Cell) -> None:
            root_coords_1 = find(cell_1)
            root_coords_2 = find(cell_2)
            if (root_coords_1 != root_coords_2):
                parent_map[root_coords_2] = root_coords_1

        # Generate List of Walls (Random Order)
        walls = [] # e.g. (cell_1, cell_2)
        for y in range(height):
            for x in range(width):
                anchor_cell = grid.get_cell(y, x)
                if (x < width-1):
                    # Add Eastern Wall -> Cell & East Neighbour Cell
                    walls.append((anchor_cell, grid.get_cell_neighbour(anchor_cell, 'E')))
                if (y < height-1):
                    # Add Southern Wall
                    walls.append((anchor_cell, grid.get_cell_neighbour(anchor_cell, 'S')))
        self.rng.shuffle(walls)

        # Iterate through Every Wall
        for (cell_1, cell_2) in walls:
            # If Both Cells are in Different Sets -> Disconnected
            if (find(cell_1) != find(cell_2)):
                # Create Connection & Join Sets
                grid.create_path(cell_1, cell_2)
                union(cell_1, cell_2)

        # Return Logical Maze
        return grid