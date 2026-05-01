from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
# from fastapi.templating import Jinja2Templates

from app.routes import audio, notes, pdf, text, youtube
# import os
# from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Lexient AI Backend")

app.include_router(text.router)
app.include_router(pdf.router)
app.include_router(audio.router)
app.include_router(youtube.router)
app.include_router(notes.router)

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[""],
#     allow_credentials=True,
#     allow_methods=[""],
#     allow_headers=["*"],
# )

app.mount("/static", StaticFiles(directory="static"), name="static")
# templates = Jinja2Templates(directory="templates")

@app.get("/")
def home():
    return FileResponse("templates/index.html")