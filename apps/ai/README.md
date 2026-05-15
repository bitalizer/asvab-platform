# @asvab/ai

Python FastAPI service for MissionReady. Hosts AI question generation, SymPy-based math validation, and Item Response Theory calibration. Communicates with the rest of the monorepo over HTTP.

## Local dev

```bash
uv sync --frozen
uv run uvicorn main:app --reload
```

Smoke-check: `curl http://localhost:8000/health`.

## Tests

```bash
uv run pytest -q
```
