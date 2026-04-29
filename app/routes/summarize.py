from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.pipeline_service import process_and_save
from app.core.logger import logging

router = APIRouter()

class TextRequest(BaseModel):
    text: str

@router.post("/summarize-text")
def summarize(req: TextRequest):
    try:
        logging.info("API /summarize-text called")
        
        return process_and_save(req.text, "text")

    except Exception as e:
        logging.error("API failed: /summarize-text")

        raise HTTPException(
            status_code=500,
            detail="Internal Server Error during summarization"
        )