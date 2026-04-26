from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.pdf_processor import extract_text_from_pdf
from app.services.summarizer import summarize_text
from app.core.logger import logging

router = APIRouter()

@router.post("/summarize-pdf")
async def summarize_pdf(file: UploadFile = File(...)):
    try:
        logging.info("API /summarize-pdf called")

        # Validate file type
        if not file.filename.endswith(".pdf"):
            raise HTTPException(status_code=400, detail="Only PDF files allowed")
        
        # Extract text
        text = extract_text_from_pdf(file.file)

        # Summarize
        summary = summarize_text(text)

        return {
            "summary": summary
        }
    
    except Exception as e:
        logging.error("PDF summarization failed")

        raise HTTPException(
            status_code=500,
            detail="Error processing PDF"
        )