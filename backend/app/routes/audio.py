from fastapi import APIRouter, UploadFile, File, HTTPException
import os
from backend.app.services.audio_processor import transcribe_audio
from backend.app.services.pipeline_service import process_and_save
from backend.app.core.logger import logging

router = APIRouter()

UPLOAD_DIR = "temp_audio"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/summarize-audio")
async def summarize_audio(file: UploadFile = File(...)):
    try:
        logging.info("API /summarize-audio called")

        # save file temporarily
        file_path = os.path.join(UPLOAD_DIR, file.filename)

        with open(file_path, "wb") as f:
            f.write(await file.read())

        # Step 1: Transcribe
        text = transcribe_audio(file_path)

        # Step 2: Summarize & save
        return process_and_save(text, "audio")
    
    except Exception as e:
        logging.error("Audio summarization failed")

        raise HTTPException(
            status_code=500,
            detail="Error processing audio file"
        )