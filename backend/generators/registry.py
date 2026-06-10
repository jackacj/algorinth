from .iterative_dfs import Iterative_DFS_Generator
from .kruskal import Kruskal_Generator
from .prim_simple import Prim_Simple_Generator
from .wilson import Wilson_Generator

# Generator Registry
GENERATORS = {
    "iterative_dfs": Iterative_DFS_Generator,
    "kruskal": Kruskal_Generator,
    "prim_simple": Prim_Simple_Generator,
    "wilson": Wilson_Generator
}