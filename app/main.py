from fastapi import FastAPI
from app.routes import summarize

app = FastAPI(title="Lexient AI Backend")

app.include_router(summarize.router)

@app.get("/")
def home():
    return {"message": "Lexient Backend Running....."}