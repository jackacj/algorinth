from .base import Generator
from ..cell import Cell
from ..grid import Grid

class Prim_Simple_Generator(Generator):
    
    # Generate a Prim's Maze with No Weights (Simplification)
    def generate(self, height: int, width: int) -> Grid:
        # Generate Closed Grid & Walls List
        grid = Grid(height, width)
        walls: list[tuple[Cell]] = []

        # Select Random Initial Cell
        rand_y = self.rng.randint(0, height - 1)
        rand_x = self.rng.randint(0, width - 1)
        rand_cell = grid.get_cell(rand_y, rand_x)

        # Mark as Visited & Add Walls Between Neighbours to Walls List
        rand_cell.set_visited()

        # Add Walls Between Unvisited Neighbours to Walls List
        def add_unvisited_neighbour_walls(cell: Cell):
            cell_unvisited_neighbours = grid.get_cell_neighbours(cell, True)
            for neighbour in cell_unvisited_neighbours:
                walls.append((cell, neighbour))

        add_unvisited_neighbour_walls(rand_cell)

        # Begin Iteration through Walls
        while (len(walls) != 0):
            # Select Random Wall (& Cells)
            curr_wall = self.rng.choice(walls)
            curr_cell_1 = curr_wall[0]
            curr_cell_2 = curr_wall[1]

            # Check if Only One Cell in Wall Visited
            if (curr_cell_1.get_visited() != curr_cell_2.get_visited()):
                # Create Connection & Mark Both Cells as Visited
                grid.create_path(curr_cell_1, curr_cell_2)
                curr_cell_1.set_visited()
                curr_cell_2.set_visited()

                # Add Neighbouring Walls to Wall List
                add_unvisited_neighbour_walls(curr_cell_1)
                add_unvisited_neighbour_walls(curr_cell_2)
            
            # Remove Wall from Wall List
            walls.remove(curr_wall)
        
        # Return Grid
        return grid