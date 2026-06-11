from .base import Generator
from ..cell import Cell
from ..grid import Grid

class Aldous_Broder_Generator(Generator):    

    # Generate an Aldous-Broder Maze
    def generate(self, height: int, width: int) -> Grid:
        # Generate Closed Grid
        grid = Grid(height, width)
      
        # Select Initial Cell & Mark as Visited
        rand_y = self.rng.randint(0, height - 1)
        rand_x = self.rng.randint(0, width - 1)
        curr_cell = grid.get_cell(rand_y, rand_x)
        # curr_cell.set_visited() ####################################################################################
        self.super_set_visited(curr_cell)

        # Repeat Until Every Cell is Visited
        while (not(grid.get_all_visited())):
            # Pick a Random Neighbour
            neighbour = self.pick_random_cell_neighbour(curr_cell, grid)

            # If Neighbour is Unvisited...
            if (not neighbour.get_visited()):
                # Create Connection & Mark Neighbour as Visited
                # grid.create_path(curr_cell, neighbour) ##############################################################
                self.super_create_path(curr_cell, neighbour, grid)
                # neighbour.set_visited() #############################################################################
                self.super_set_visited(neighbour)

            # Make Neighbour the Current Cell
            curr_cell = neighbour
        
        # Return Grid
        return grid