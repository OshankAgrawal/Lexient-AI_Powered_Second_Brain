from fastapi import FastAPI
from app.routes import summarize, pdf, audio, youtube

app = FastAPI(title="Lexient AI Backend")

app.include_router(summarize.router)
app.include_router(pdf.router)
app.include_router(audio.router)
app.include_router(youtube.router)

@app.get("/")
def home():
    return {"message": "Lexient Backend Running....."}