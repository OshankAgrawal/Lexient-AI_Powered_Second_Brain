from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.youtube_processor import get_transcript
from app.services.pipeline_service import process_and_save
from app.core.logger import logging

router = APIRouter()

class YouTubeRequest(BaseModel):
    url: str

@router.post("/summarize-youtube")
def summarize_youtube(req: YouTubeRequest):
    try:
        logging.info("API /summarize-youtube called")

        # Get transcript
        text = get_transcript(req.url)

        # Summarize & save
        return process_and_save(text, "youtube")
    
    except Exception as e:
        logging.error(f"YouTube summarization failed: {str(e)}")

        raise HTTPException(
            status_code=500,
            detail="Error processing YouTube video"
        )