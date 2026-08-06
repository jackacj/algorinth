# Environment Imports
from config.environment import DATABASE_URL
from config.logging import configure_logging
# Postgres Python Integration w/ SQLAlchemy ORM
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
# Logging
import logging
# Domain Models
from models.maze import Maze
from models.maze import Grid
# ORM Models
from database.models import Base, MazeModel
# UUID Type
from uuid import UUID

# Begin Logger
configure_logging()
logger = logging.getLogger(__name__)

# Create the ORM Engine, Sessionmaker & Create Tables if Don't Exist
engine = create_engine(DATABASE_URL)
session_local: Session = sessionmaker(bind = engine)
Base.metadata.create_all(engine)

# Save a Maze to DB
def save_maze(maze: Maze) -> Maze:
    # Open a Session
    with session_local() as session:
        # Create a New ORM Maze Model from Maze
        maze_model = MazeModel.from_domain(maze)

        # Add Maze Model to DB in Session
        logger.info(f"Saving Maze {maze.id}...")
        session.add(maze_model)

        # Commit the Session to DB
        session.commit()
        logger.info(f"Saved Maze {maze.id}")

        # Refresh Maze Model & Return Domain Object
        session.refresh(maze_model)
        return maze_model.to_domain()

# Load a Maze from DB w/ Id
def get_maze(maze_id: UUID) -> Maze | None:
    # Open a Session
    with session_local() as session:
        # Retrieve ORM Maze Model from DB
        logger.info(f"Retrieving Maze {maze_id}...")
        maze_model = session.get(MazeModel, maze_id)

        # Return None if Not Found
        if maze_model is None:
            logger.info(f"Failed to Retrieve Maze {maze_id}")
            return None

        # Return Domain Model
        logger.info(f"Retrieved Maze {maze_id}")
        return maze_model.to_domain()

# Update an Existing Maze from DB
# Returns True if Updated, False if No Maze w/ Id Exists
def update_maze(maze: Maze) -> bool:
    # Open a Session
    with session_local() as session:
        # Retrieve ORM Maze Model from DB
        logger.info(f"Updating Maze {maze.id}...")
        maze_model = session.get(MazeModel, maze.id)

        # Return False if Not Found
        if maze_model is None:
            logger.info(f"Failed to Update Maze {maze.id}, Not Found")
            return False
        
        # Update Existing ORM Maze Model w/ New Maze Details
        maze_model.settings = maze.settings
        maze_model.steps = maze.steps
        maze_model.final_maze = maze.final_maze.to_json()

        # Commit the Session to DB
        session.commit()
        logger.info(f"Updated Maze")
        return True

# Delete a Maze w/ Id
# Returns True if Deleted, False if No Maze w/ Id Exists
def delete_maze(maze_id: UUID) -> bool:
    # Open a Session
    with session_local() as session:
        # Retrieve ORM Maze Model from DB
        logger.info(f"Deleting Maze {maze_id}...")
        maze_model = session.get(MazeModel, maze_id)

        # Return False if Not Found
        if maze_model is None:
            logger.info(f"Failed to Delete Maze {maze_id}, Not Found")
            return False

        # Delete Maze & Commit the Session to DB
        session.delete(maze_model)
        session.commit()
        logger.info(f"Deleted Maze {maze_id}")
        return True