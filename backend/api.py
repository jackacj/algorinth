# FastAPI Imports
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
# Async Context
from contextlib import asynccontextmanager
# Configuration Import
from config.environment import FRONTEND_URL
from config.logging import configure_logging
# Logging
import logging
# UUID Type
from uuid import UUID
# Maze Generation Logic
from services.gen_service import generate_maze
# Database Logic
from database.repository import save_maze, get_maze
# Models
from models.maze import Maze
from schemas.request import MazeGenerationRequest, MazeSaveRequest
from schemas.response import MazeResponse

# Begin Logger
configure_logging()
logger = logging.getLogger(__name__)

# App Lifespan Context Manager
@asynccontextmanager
async def lifespan(app: FastAPI):
    # On Application Startup

    # Regular Backend Execution
    yield
    # On Application Shutdown

# Initialise App
app = FastAPI(lifespan = lifespan)

# Give Frontend IP Permission to Communicate w/ Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

## Global Handler for HTTP Exceptions
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    # Log HTTPException Warning
    logger.warning(
        "HTTP %s: %s",
        exc.status_code,
        exc.detail,
    )
    
    # Return JSON Response to Client
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.detail},
    )

## Readiness Check Endpoint
@app.get("/health")
def health():
    return {"status": "ok"}

## '/mazes' Endpoints

# Request to Generate Maze from Frontend
# Response Model -> MazeResponse
@app.post("/mazes", response_model = MazeResponse)
# Request Model -> MazeGenerationRequest 
async def maze_generate_request(settings: MazeGenerationRequest):
    # Generate a Maze based on Request Settings -> Convert Request Body to Dictionary
    logger.info(f"POST /mazes Generation Request ({settings})")
    maze = generate_maze(settings)

    # Return a Maze Response
    logger.info(f"POST /mazes Generation Response ({settings})")
    return MazeResponse.from_domain(maze)

# Get a Specific Maze w/ UUID
# Response Model -> MazeResponse
@app.get("/mazes/{id}", response_model = MazeResponse)
async def maze_retrieval_request(id: UUID):
    # Get Maze Object for UUID -> Could Be Empty
    logger.info(f"GET /mazes/{id} Retrieval Request")
    maze = get_maze(id)

    # If Maze is Not Found, Return 404 Exception
    if maze is None:
        raise HTTPException(
            status_code = 404,
            detail = "Maze not found."
        )
    
    # Return a Maze Response
    logger.info(f"GET /mazes/{id} Retrieval Response")
    return MazeResponse.from_domain(maze)

# Save a Specific Maze
# Response Model -> MazeResponse
@app.post("/mazes/{id}/save", response_model = MazeResponse)
async def maze_save_request(id: UUID, maze_data: MazeSaveRequest):
    # Get Maze Object from Request
    logger.info(f"POST /mazes/{id}/save Persistence Request")
    maze = maze_data.to_domain()

    # Save to Database
    saved_maze = save_maze(maze)

    # Return Updated Maze State in Maze Response
    logger.info(f"POST /mazes/{id}/save Persistence Response")
    return MazeResponse.from_domain(saved_maze)