# Logging
import logging
from config.logging import configure_logging
# Maze Generation Logic
from generators.registry import GENERATORS
from recorders.step_recorder import Step_Recorder
# Models
from models.maze import Maze
from schemas.request import MazeGenerationRequest

# Begin Logger
configure_logging()
logger = logging.getLogger(__name__)

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
    logger.info(f"Generating Maze (rows={height}, cols={width}, algorithm=\'{algorithm}\', seed=\'{seed}\')...")
    grid =  generator.generate(height, width)
    steps = recorder.get_steps()
    logger.info(f"Generated Maze (rows={height}, cols={width}, algorithm=\'{algorithm}\', seed=\'{seed}\')...")

    # Create Maze Object and Return
    maze = Maze(settings = settings.model_dump(), steps = steps, final_maze = grid, saved = False)
    return maze