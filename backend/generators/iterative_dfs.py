from .base import Generator
from ..grid import Grid

class Iterative_DFS_Generator(Generator):
    
    # Generate an IterativeDFS Maze
    def generate(self, height: int, width: int) -> Grid:
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