# Datatypes
from sqlalchemy import DateTime
from sqlalchemy import JSON
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime, UTC
# Creating ORM Tables
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
# Domain Models
from ..models.maze import Grid
from ..models.maze import Maze

# Declare Base ORM Model -> Inherited by Other ORM Models
class Base(DeclarativeBase):
    pass

# Maze Table
class MazeModel(Base):
    __tablename__ = "maze"

    # UUID Field
    maze_id: Mapped[UUID] = mapped_column(
        UUID(as_uuid = True),
        primary_key = True
    )

    # Date/Time Field
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone = True),
        default = lambda: datetime.now(UTC),
    )

    # Settings Field
    settings: Mapped[dict] = mapped_column(JSON)

    # Steps Field
    steps: Mapped[list] = mapped_column(JSON)

    # Final Maze Field
    final_maze: Mapped[dict] = mapped_column(JSON)

    # Convert to Domain Model
    def to_domain(self) -> Maze:
        return Maze(
            maze_id = self.maze_id,
            settings = self.settings,
            steps = self.steps,
            final_maze = Grid.from_json(self.final_maze),
            saved = True
        )

    # Convert from Domain Model
    @classmethod
    def from_domain(cls, maze: Maze) -> "MazeModel":
        return cls(
            maze_id = maze.id,
            settings = maze.settings,
            steps = maze.steps,
            final_maze = maze.final_maze.to_json()
        )