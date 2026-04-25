from fastapi import FastAPI

app = FastAPI(title="Lexient AI Backend")

@app.get("/")
def home():
    return {"message": "Lexient Backend Running....."}