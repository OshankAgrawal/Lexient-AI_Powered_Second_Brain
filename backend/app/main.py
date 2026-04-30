from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from backend.app.routes import youtube
from backend.app.routes import audio, notes, pdf, text

app = FastAPI(title="Lexient AI Backend")

app.include_router(text.router)
app.include_router(pdf.router)
app.include_router(audio.router)
app.include_router(youtube.router)
app.include_router(notes.router)

# Mount static files
app.mount("/static", StaticFiles(directory="src/static"), name="static")
templates = Jinja2Templates(directory="src/templates")

@app.get("/")
def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})