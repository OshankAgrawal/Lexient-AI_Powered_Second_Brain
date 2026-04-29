from fastapi import FastAPI
from app.routes import pdf, audio, summarize, youtube, notes

app = FastAPI(title="Lexient AI Backend")

app.include_router(summarize.router)
app.include_router(pdf.router)
app.include_router(audio.router)
app.include_router(youtube.router)
app.include_router(notes.router)

@app.get("/")
def home():
    return {"message": "Lexient Backend Running....."}