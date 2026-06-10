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