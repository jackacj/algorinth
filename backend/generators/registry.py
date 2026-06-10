from .iterative_dfs import Iterative_DFS_Generator
from .kruskal import Kruskal_Generator

# Generator Registry
GENERATORS = {
    "iterative_dfs": Iterative_DFS_Generator,
    "kruskal": Kruskal_Generator
}