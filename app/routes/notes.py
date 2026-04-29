from fastapi import APIRouter, HTTPException
from app.services.note_service import get_all_notes
from app.core.logger import logging

router = APIRouter()
    
@router.get("/get-notes")
def get_notes():
    try:
        logging.info("API /get-notes called")

        notes = get_all_notes()

        return {
            "notes": notes
        }
    
    except Exception as e:
        logging.error("Fetching notes failed")

        raise HTTPException(
            status_code=500,
            detail="Error fetaching notes"
        )