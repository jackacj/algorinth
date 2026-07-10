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
    
    # Return a JSON Serialisable Grid State
    def to_json(self) -> dict:
        return {
            "row": self.loc_y,
            "col": self.loc_x,
            "visited": self.is_visited,
            "paths": {
                "north": 'N' in self.paths,
                "south": 'S' in self.paths,
                "east": 'E' in self.paths,
                "west": 'W' in self.paths
            }
        }
    
    # Turn a JSON Grid State into a Cell Object
    # Use Decorator to Call without Instance
    @classmethod
    def from_json(cls, data: dict):
        # Construct Paths Set
        path_lookup = {
            "north": "N",
            "south": "S",
            "east": "E",
            "west": "W",
        }

        paths = {
            direction
            for json_name, direction in path_lookup.items()
            if data["paths"][json_name]
        }

        # Return Cell Instance
        return Cell(
            y = data["row"],
            x = data["col"],
            is_visited = data["visited"],
            paths = paths
        )