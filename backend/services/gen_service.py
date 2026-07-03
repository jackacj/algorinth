# Annotated Python Hints
from typing import Annotated
# Maze Generation Logic
from ..generators.registry import GENERATORS
from ..recorders.step_recorder import Step_Recorder
# Models
from ..models.maze import Maze

def generate_maze(settings: dict) -> Maze:
    # Unpack Settings
    height = settings["rows"]
    width = settings["cols"]
    algorithm = settings["algorithm"]
    
    # Check for Seed
    if (settings["seed"] == ""):
        seed = None
    else:
        seed = settings["seed"]

    # Create Active Recorder & Algorithm/Seed Specific Generator
    generator_cls = GENERATORS[algorithm] 
    recorder = Step_Recorder()
    generator = generator_cls(seed, recorder)

    # Produce the Maze Grid & Generation Steps
    grid =  generator.generate(height, width)
    steps = recorder.get_steps()

    # Create Maze Object and Return
    maze = Maze(settings, steps, grid)
    return maze