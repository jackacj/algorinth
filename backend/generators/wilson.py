from .base import Generator
from ..cell import Cell
from ..grid import Grid

class Wilson_Generator(Generator):
    
    # Generate a Wilson's Maze
    def generate(self, height: int, width: int) -> Grid:
        # Generate Closed Grid
        grid = Grid(height, width)
        
        # Select Initial Cell & Mark as Visited
        rand_y = self.rng.randint(0, height - 1)
        rand_x = self.rng.randint(0, width - 1)
        rand_cell = grid.get_cell(rand_y, rand_x)
        rand_cell.set_visited()

        # Repeat Until Every Cell is Visited
        while (not(grid.get_all_visited())):
            # Pick Random Unvisited Cell
            curr_cell = self.pick_random_cell(grid, True)

            # Set Up Random Walk (Path, Condition, Initial Walking Cell)
            path = [curr_cell]
            is_walking = True
            walk_cell = curr_cell

            # Perform Random Walk
            while (is_walking):
                # Generate Neighbours of Current Walking Cell
                neighbours = grid.get_cell_neighbours(walk_cell)

                # Randomly Select Neighbour
                next_cell = self.rng.choice(neighbours)

                # If Neighbour Already In Path (Loop)...
                if(next_cell in path):
                    # Truncate List to Remove Loop
                    idx = path.index(next_cell)
                    path = path[:idx + 1]
                else:
                    # Add Neighbour to Path
                    path.append(next_cell)

                # If Neighbour Already Visited (Finished Walk)
                if(next_cell.get_visited()):
                    # Finish Random Walk
                    is_walking = False
                else:
                    # Continue Walk with Neighbour as Walking Cell
                    walk_cell = next_cell
            
            # Add All Path Cells to Visited
            for cell in path:
                cell.set_visited()

            # Create Connections Between Path Cells
            for idx in range(len(path)-1):
                grid.create_path(path[idx], path[idx + 1])

        # Return Grid
        return grid
