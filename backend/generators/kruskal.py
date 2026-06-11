from .base import Generator
from ..cell import Cell
from ..grid import Grid

class Kruskal_Generator(Generator):
    
    # Generate a Kruskal's Maze
    def generate(self, height: int, width: int) -> Grid:
        # Generate Closed Grid
        grid = Grid(height, width)

        # Populate a "Parent Mapping" with Cell Coords pointing to themselves
        parent_map = {}
        for y in range(height):
            for x in range(width):
                parent_map[(y, x)] = (y, x)

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
            if (grid.find(cell_1, parent_map) != grid.find(cell_2, parent_map)):
                # Create Connection & Join Sets
                # grid.create_path(cell_1, cell_2) ###########################################################################################
                self.super_create_path(cell_1, cell_2, grid)
                # grid.union(cell_1, cell_2, parent_map) #####################################################################################
                self.super_union(cell_1, cell_2, parent_map, grid)

        # Return Grid
        return grid