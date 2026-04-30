import pdfplumber
from app.core.logger import logging
from app.core.exception import CustomException
import sys

def extract_text_from_pdf(file) -> str:
    try:
        logging.info("PDF extraction started")

        text = ""

        with pdfplumber.open(file) as pdf:
            for page in pdf.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"

        if not text.strip():
            raise ValueError("No text found in PDF")
        
        logging.info("PDF extraction completed")

        return text
    
    except Exception as e:
        logging.error("Error in PDF extraction")
        raise CustomException(e, sys)