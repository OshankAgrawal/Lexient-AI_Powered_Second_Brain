from app.services.summarizer import summarize_text
from app.services.note_service import save_note

def process_and_save(input_data: str, input_type: str):
    summary = summarize_text(input_data)

    note = {
        "type": input_type,
        "input_data": input_data,
        "summary": summary
    }

    result = save_note(note)

    return {
        "summary": summary,
        "note_id": result["id"]
    }