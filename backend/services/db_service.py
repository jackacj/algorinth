# Postgres Python Integration
import psycopg2
from psycopg2.extras import Json
# Models
from ..models.maze import Maze
from ..models.maze import Grid

# Connect to Database and Establish Point of Access
# Hardcoded Connection to Localhost DB 'algorinth'
def create_db_connection():
    connection = psycopg2.connect(host = "localhost", port = 5433, dbname = "algorinth", user="postgres", password = "postgres")
    cursor = connection.cursor()
    return connection, cursor

# Establish Maze Table if Non-Existent
def establish_maze_table(cursor):
    # Execute Table-Creating SQL Statement
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
    cursor.execute(table_query)

# Convert Maze Tuples (Sourced from DB) into Maze Objects
# [0] = UUID, [1] = Timestamp, [2] = settings, [3] = steps, [4] = final_maze JSON
def convert_tuple_to_maze(maze_tuple: tuple) -> Maze:
    # Build & Return Maze Object from Tuple
    return Maze(
        settings = maze_tuple[2],
        steps = maze_tuple[3],
        final_maze = Grid.from_json(maze_tuple[4]),
        maze_uuid = maze_tuple[0]
    )

def save_maze(maze: Maze):
    # Connect to 'algorinth' Database & Create Cursor (Point of Access)
    conn, cur = create_db_connection()

    # Establish Table if Non-Existent -> SQL
    establish_maze_table(cur)

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
        Json(maze.final_maze.to_json()),
    ))

    # Commit Changes & Close Connection
    conn.commit()
    cur.close()
    conn.close()

# Retrieve a Specific 'Maze' Entry from the Database
# Convert Maze Entry to Maze Object & Return
def get_maze_by_uuid(given_uuid: str) -> Maze:
    # Connect to 'algorinth' Database & Create Cursor (Point of Access)
    conn, cur = create_db_connection()

    # Establish Table if Non-Existent -> SQL
    establish_maze_table(cur)

    # Query for Maze Entry with Given UUID
    cur.execute(
    """
    --sql
    SELECT * FROM maze WHERE maze_id::text = %s;
    """,
    (
        given_uuid,
    ))

    # (Only One Result) Fetch the First Result & Return Maze Object
    given_maze_tuple = cur.fetchone()
    return convert_tuple_to_maze(given_maze_tuple)