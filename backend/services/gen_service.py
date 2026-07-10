# Annotated Python Hints
from typing import Annotated
# Maze Generation Logic
from ..generators.registry import GENERATORS
from ..recorders.step_recorder import Step_Recorder
# Models
from ..models.maze import Maze
from ..schemas.request import MazeGenerationRequest

def generate_maze(settings: MazeGenerationRequest) -> Maze:
    # Unpack Request Settings
    height = settings.rows
    width = settings.cols
    algorithm = settings.algorithm
    seed = settings.seed

    # Create Active Recorder & Algorithm/Seed Specific Generator
    generator_cls = GENERATORS[algorithm] 
    recorder = Step_Recorder()
    generator = generator_cls(seed, recorder)

    # Produce the Maze Grid & Generation Steps
    grid =  generator.generate(height, width)
    steps = recorder.get_steps()

    # Create Maze Object and Return
    maze = Maze(settings = settings.model_dump(), steps = steps, final_maze = grid)
    return maze