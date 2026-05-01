from fastapi import APIRouter, HTTPException
from app.services.notes_service import get_all_notes, search_all_notes
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
    

@router.get("/search")
def search_notes(query: str):
    try:
        logging.info("API /search called")

        return search_all_notes(query)

    except Exception as e:
        logging.error("Searching notes failed")

        raise HTTPException(
            status_code=500,
            detail="Error Searching notes"
        )