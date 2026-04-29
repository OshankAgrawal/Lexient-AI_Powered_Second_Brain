from app.core.database import notes_collection
from datetime import datetime
from app.core.logger import logging
from app.core.exception import CustomException
import sys

def save_note(note: dict):
    try:
        note["created_at"] = datetime.utcnow()

        result = notes_collection.insert_one(note)

        logging.info("Note saved to database")

        return {
            "message": "Saved successfully",
            "id": str(result.inserted_id)
        }
    
    except Exception as e:
        logging.error(f"Error saving note: {str(e)}")
        raise CustomException(e, sys)
    

def get_all_notes():
    try:
        notes = list(notes_collection.find())

        # Filter only valid datetime entries
        valid_notes = [
            note for note in notes
            if isinstance(note.get("created_at"), datetime)
        ]

        # Sort safely in python
        valid_notes.sort(key=lambda x: x["created_at"], reverse=True)

        for note in valid_notes:
            note["_id"] = str(note["_id"])

        return valid_notes
    
    except Exception as e:
        logging.error(f"Error fetching notes: {str(e)}")
        raise CustomException(e, sys)