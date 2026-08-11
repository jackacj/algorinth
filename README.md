# Algorinth

> An interactive visualiser for procedural maze generation. Generate, explore, save and export custom mazes for your projects while watching them grow algorithmically.

[![Live Demo](https://shields.io)](http://16.171.67.237)
[![GitHub Repo](https://shields.io)](https://github.com/jackacj/algorinth)

Current Release: 1.0.0

---

## Video Previews

[![Algorinth 1.0.0 Playback Video Preview](https://youtu.be/stCC-9u-E5g)](https://youtu.be/stCC-9u-E5g)
[![Algorinth 1.0.0 Persistent Mazes Video Preview](https://youtu.be/dvJxTdPDqvU)](https://youtu.be/dvJxTdPDqvU)
[![Algorinth 1.0.0 Exporting Mazes Video Preview](https://youtu.be/NHUO1kpYjUY)](https://youtu.be/NHUO1kpYjUY)

---

## The Problem & Solution

- **The Problem:** Maze generation algorithms are often presented as static code or as a final grid layout, making it difficult to grasp how these mazes are algorithmically constructed.
- **The Solution:** 'Algorinth' provides an interactive visualisation of procedural maze generation in which users can configure a maze, watch generation step-by-step, hold on to unique/useful mazes and export the final results as an image.

Additionally, this project was designed as a comprehensive full-stack engineering project. The scope covers frontend state management, API design, database modelling, containerisation and cloud deployment.

---

## Key Features

- **Multiple Algorithms**: Various algorithms ranging including backtrackers, random walkers, and recursive processes are available to use. Supported algorithms contain explanations, visual demonstrations and use-cases.
- **Incremental Generation Playback**: Watch the generation process one step at a time, jump between different states, or let the algorithm autostep with dynamically rendered maze grids in _Visualisation Mode_.
- **Rapid Maze Procurement**: Tweak generation settings and quickly find the right mazes for your projects using _Instant Mode_.
- **Configurable Parameters**: Dimensions, algorithm used, and random seeds can all be utilised for customised, deterministic generation.
- **Maze Persistence**: Save generated mazes to PostgreSQL and retrieve them in different sessions using their UUID. These identifiers are used independently of persistence, keeping generation state and persistence state seperate.
- **Image Exporting**: Completed mazes can be exported in various image formats (PNG, JPEG, WEBP) and with custom cell colours independent of the application state.
- **Dockerised Full-stack Application**: Run the frontend, backend and PostgreSQL database together using Docker Compose.
- **Cloud Deployment**: 'Algorinth' is deployed to AWS EC2 using the same containerised architecture used during development.

---

## Tech Stack

### Frontend

- **Web Framework**: React + Vite
- **Language(s)**: Javascript / JSX
- **Styling**: CSS / Font Awesome (Icons)
- **Image Export**: html2canvas

### Backend & Database

- **API Framework**: FastAPI
- **Language**: Python
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Validation & Schemas**: Pydantic

### DevOps & Deployment

- **Containerisation**: Docker
- **Orchestration**: Docker Compose
- **Static Serving & Reverse Proxy**: Nginx
- **Cloud Hosting**: AWS EC2
- **Source Control**: Git / GitHub

---

## Architecture & Database Schema

Algorinth is structured as a monorepo, containing independent frontend and backend applications.

```
├── frontend/           # React application
│ ├── src/
│ │ ├── components/     # Reusable UI elements
│ │ ├── hooks/          # Custom React hooks
│ │ ├── services/       # API & JavaScript services
│ │ └── styles/         # Application styling
│ ├── Dockerfile        # Frontend container build
│ └── nginx.conf        # Nginx configuration
│ └── ...

├── backend/            # FastAPI server
│ ├── schemas/          # Request & Response DTO schemas
│ ├── services/         # Python services
│ ├── models/           # Domain models for generation
│ ├── generators/       # Maze generation algorithms
│ ├── recorders/        # Maze generation process recorders
│ ├── database/         # Database/ORM Implementation
│ │ ├── models.py       # SQLAlchemy ORM models
│ │ └── repository.py   # PostgreSQL repository
│ ├── config/           # Configuration & logging
│ ├── Dockerfile        # Backend container build
│ └── api.py            # FastAPI entrypoint

└── docker-compose.yml  # Composition & deployment
```

The application separates different representations of the maze instead of using a single model throughout the stack. This loosely couples models and allows each to be optimised towards their specific use-case.

React Frontend -> **HTTP / JSON**
FastAPI -> **Pydantic Schema**
Generation -> **Domain Model**
PostgreSQL Repository -> **SQLAlchemy ORM Models**

Nginx does two jobs: serving the React SPA and proxying `/api` requests to the FastAPI container. PostgreSQL is internal to the Docker subnet and is not exposed directly.

The database stores persisted maze information using the following schema. `JSON` was chosen over `JSONB` as a storage medium as objects are typically retrieved in their entirely instead of being internally queried.

```
maze_id: UUID (Primary Key),              # Identifier
created_at: Datetime (Defaults to UTC),   # Timestamp
settings: JSON,                           # Generation parameters
steps: JSON,                              # Generation steps
final_maze: JSON,                         # Final maze layout
```

---

## Quick Start

### Prerequisites

With Docker (Recommended):
-- Git
-- Docker
-- Docker Buildx (**v0.17** or later)
-- Docker Compose

Without Docker:
-- Python 3.13+
-- pip
-- Node.js 22+
-- npm
-- PostgreSQL 18

### Installation Steps (with Docker)

This method is recommended as it is the same method used to build the application during both development and deployment.

1. **Clone the Repository**

   ```bash
   git clone https://github.com/jackacj/algorinth.git
   cd algorinth
   ```

2. **Setup Environmental Variables**
   Create the required environmental files using the provided example files. Adjust the values to your local environment.

   With Docker Compose, the database hostname should be the PostgreSQL service name instead of `localhost`.

   ```bash
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   cp .env.example .env
   ```

3. **Start the Application**
   Start the application using Docker Compose from the root directory. This starts all services (React + Nginx, FastAPI, PostgreSQL).

   ```bash
   docker compose build
   docker compose up -d

   # Application can be accessed at:
   http://localhost

   # Backend API can be accessed via the reverse proxy:
   http://localhost/api
   http://localhost/api/health
   ```

4. **End the Application**

   ```bash
   # Retain database volume (persistent mazes)
   docker compose down

   # Discard database volume (persistent mazes)
   docker compose down -v
   ```

### Installation Steps (without Docker)

This method was used earlier in development and prior to containerisation of the application. Requires more of your local environment.

1. **Clone the Repository**

   ```bash
   git clone https://github.com/jackacj/algorinth.git
   cd algorinth
   ```

2. **Setup PostgreSQL**
   Create a PostgreSQL database and user in your local environment. The connection string should be in the following format:

   ```bash
   postgresql+psycopg://<USER>:<PASSWORD>@localhost:5432/<DATABASE_NAME>
   ```

3. **Configure the Backend**
   Create the backend environment `backend/.env` using the following variables:

   ```bash
   DATABASE_URL=postgresql+psycopg://<USER>:<PASSWORD>@localhost:5432/<DATABASE> FRONTEND_URL=http://localhost:5173
   ```

   Following this, create and activate the Python virtual environment from the root directory. Specific commands will differ between operating systems:

   ```bash
   python -m venv .venv

   # Linux/MacOS
   source .venv/bin/activate
   # Windows
   .venv/Scripts/activate

   pip install -r backend/requirements.txt
   ```

4. **Configure the Frontend**
   Create the frontend environment `frontend/.env` using the following variable:

   ```bash
   VITE_API_BASE_URL=http://localhost:8000
   ```

   Following this, install the frontend dependencies

   ```bash
   npm install
   ```

5. **Launch the Local Application**
   Within their respective directories `backend/` and `frontend/`, launch each process using the following commands:

   ```bash
   # Backend
   cd backend
   fastapi dev

   # Frontend
   cd frontend
   npm run dev

   # Application can be accessed at:
   http://localhost:5173               # Frontend
   http://localhost:8000               # Backend
   http://localhost:8000/health
   ```

---

## API Overview

'Algorinth' exposes a RESTful API for maze generation and persistence. When launched as part of a Docker Compose, API requests are exposed through `/api` and when launched locally they are exposed through `localhost:8000`.

| Method | Endpoint           | Request DTO             | Response DTO   | Description            |
| ------ | ------------------ | ----------------------- | -------------- | ---------------------- |
| `POST` | `/mazes`           | `MazeGenerationRequest` | `MazeResponse` | Generates a new maze   |
| `GET`  | `/mazes/{id}`      | Path parameter          | `MazeResponse` | Retrieve a saved maze  |
| `POST` | `/mazes/{id}/save` | `MazeSaveRequest`       | `MazeResponse` | Saves a generated maze |
| `GET`  | `/health`          | n/a                     | `JSON`         | Backend Health Check   |

---

## Challenges & Technical Learnings

### Separation of Domain, API & Persistence Models

- **Challenge:** Mazes need different representations depending on their use-case. Rendering needs easily queried state, API needs serialisable request/response schemas, generation needs robust domain models etc.
- **Solution:** 'Algorinth' separates maze models into frontend state, Pydantic schemas, domain models and SQLAlchemy ORM models. These can be converted between class methods and constructors.
- **Key Insight:** Keeping represenations separate keeps the implementation of application components (rendering, API, generation, database) loosely coupled and robust.

### Docker & Containerisation

- **Challenge:** Each application service needs to communicate within containers for portability/deployment, however doing so causes the backend to fail because it relies on the database service to be ready during instantiation.
- **Solution:** Introduce a database healthcheck during docker compostion, only allowing the backend service to begin once the database id deamed "healthy" and can begin accepting connections.
- **Key Insight:** Assumptions made during local development can fall apart while architecting deployable code. Remaining flexible and willing to update your build strategy is crucial to actually shipping programs.

### Increasing the Number of Algorithms

- **Challenge:** Early in development, simple algorithm-specific generators were sufficient. However, when seeded RNG, generation step-recording and logging are introduced, the volume of repeated code made scaling to new algorithms infeasable.
- **Solution**: Create generators programmatically using an abstract base class which owns RNG, recording and logging, and an easily extendable registry. Adding new algorithms becomes one registry entry and one generate function.
- **Key Insight**: Bottlenecks resulting from well-designed solutions "at the time" dealing with new responsibilities requires rethinking old approaches and building modular solutions that can scale to new demands with ease.

### Rendering Clashing with Exporting

- **Challenge:** Exported maze images are created directly from rendered JSX using html2canvas. Given rendering maze grids and signalling for exporting use React state hooks which are updated asynchronously, there was no way guarantee exported mazes would have the correct layout/colour at download time. Additionally, tightly coupling the states to fix this issue caused the colour picking UI to become slow and unresponsive.
- **Solution**: Changed the export signal to not immediately trigger a download. Instead, a custom hook was written to check the states of the export signal and styling which only trigger downloads after both asynchronous state updates.
- **Key Insight**: Solutions don't always fit into the assumed mold of your architecture and it's advantageous to think outside the box and deviate when it's required. It's better that a feature works as intended for a client than a broken feature which fits arbitrary standards.

### Cloud Deployment

- **Challenge**: The application needed to be deployed as a complete full-stack system, cloud services offer a wide range of features but these can quickly overwhelm, provoke poor decision-making and introduce roadblocks into future development beyond deployment.
- **Solution**: The existing Docker Compose stack was deployed to an AWS EC2 instance, using Nginx as a public entry point and keeping FastAPI and PostgreSQL as internal services for simplicity and ease of maintanence.
- **Key Insight**: Judiciously choosing the technologies you use help avoid complexity when unnecessary while also saving costs and taking full advantage of your existing competencies.

---

## Future Roadmap

### UI/UX

- [ ] Light/Dark Mode.
- [ ] Mobile Frontend.

### Extending Features

- [ ] More Algorithms (e.g. Hunt & Kill).
- [ ] Richer Playback States (e.g. Focused Cells, Recently Modified).

### Improving Existing Features

- [ ] Improved Search for Existing Mazes (e.g. Names, Tags).
- [ ] Improved Large-Maze Rendering and Performance.

### Polish

- [ ] Custom Domain.
- [ ] Move from PostgreSQL Internal Service to Managed DB.

---

## Known Issues

-- Noticeably slower playback with > 1000 cells.
-- Autoplay speed indicator becomes inaccurate at higher cell counts.
-- Slow GIFs for the different algorithms.
-- Playback position isn't preserved after saving the current maze.

---

© 2026 by jackacj
