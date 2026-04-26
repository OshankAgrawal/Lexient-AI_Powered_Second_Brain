from fastapi import FastAPI
from app.routes import summarize, pdf, audio

app = FastAPI(title="Lexient AI Backend")

app.include_router(summarize.router)
app.include_router(pdf.router)
app.include_router(audio.router)

@app.get("/")
def home():
    return {"message": "Lexient Backend Running....."}