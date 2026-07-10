# Postgres Python Integration
import psycopg2
from psycopg2.extras import Json
# Models
from ..models.maze import Maze

def save_maze(maze: Maze):
    # Connect to 'algorinth' Database & Create Cursor (Point of Access)
    # LOCALHOST for Debugging
    conn = psycopg2.connect(host = "localhost", port = 5433, dbname = "algorinth", user="postgres", password = "postgres")
    cur = conn.cursor()

    # Establish Table if Non-Existent -> SQL
    table_query = """
    --sql
    CREATE TABLE IF NOT EXISTS maze (
        maze_id UUID PRIMARY KEY,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        settings JSONB NOT NULL DEFAULT '{}'::jsonb,
        steps JSONB NOT NULL DEFAULT '{}'::jsonb,
        final_maze JSONB NOT NULL DEFAULT '{}'::jsonb
    );
    """
    cur.execute(table_query)

    # Save 'Maze' to Table -> SQL
    cur.execute(
    """
    --sql
    INSERT INTO maze (maze_id, settings, steps, final_maze)
    VALUES (%s, %s, %s, %s);
    """,
    (
        maze.id,
        Json(maze.settings),
        Json(maze.steps),
        Json(maze.final_maze.get_json()),
    ))

    # Commit Changes & Close Connection
    conn.commit()
    cur.close()
    conn.close()