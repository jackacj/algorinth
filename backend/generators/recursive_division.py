from .base import Generator
from ..grid import Grid

"""
"recursive_divide" may be a visually interesting event.
May be worth coming back and creating a "super_recursive_divide" function.
"""

class Recursive_Division_Generator(Generator):

    # Recursive Division Function
    def recursive_divide(self, height: int, width: int, top: int, left: int, grid: Grid) -> Grid:
        # Minimum Size to Divide -> Exit Recursion
        if (height < 2) or (width < 2):
            return grid

        if (width > height):
            # Vertical Wall - Determine Wall & Gap Position Relative
            hori_wall = self.rng.randrange(1, width)
            vert_gap = self.rng.randrange(height)

            # Create Wall & Gap
            for y in range(height):
                if (y != vert_gap):
                    cell_1 = grid.get_cell(y + top, hori_wall + left - 1) 
                    cell_2 = grid.get_cell(y + top, hori_wall + left) 
                    # grid.remove_path(cell_1, cell_2) #####################################################################################
                    self.super_remove_path(cell_1, cell_2, grid)

            # Recur on Sub-Chambers (Left & Right)
            grid = self.recursive_divide(height, hori_wall, top, left, grid)
            grid = self.recursive_divide(height, width - hori_wall, top, left + hori_wall, grid)

        else:
            # Horizontal Wall - Determine Wall & Gap Position
            vert_wall = self.rng.randrange(1, height)
            hori_gap = self.rng.randrange(width)

            # Create Wall & Gap
            for x in range(width):
                if (x != hori_gap):
                    cell_1 = grid.get_cell(vert_wall + top - 1, x + left)
                    cell_2 = grid.get_cell(vert_wall + top, x + left)
                    # grid.remove_path(cell_1, cell_2) ###################################################################################
                    self.super_remove_path(cell_1, cell_2, grid)

            # Recur on Sub-Chambers (Top & Bottom)
            grid = self.recursive_divide(vert_wall, width, top, left, grid)
            grid = self.recursive_divide(height - vert_wall, width, top + vert_wall, left, grid)

        return grid    

    # Generate an Aldous-Broder Maze
    def generate(self, height: int, width: int) -> Grid:
        # Generate Open Grid
        # grid = Grid(height, width) ###################################################################################################
        grid = self.super_create_grid(height, width, True)

        # Begin Recursive Division   
        grid = self.recursive_divide(height, width, 0, 0, grid)

        # Return Grid
        return grid