from app.services.load_models import load_t5_small
from app.core.logger import logging
from app.core.exception import CustomException
import sys
import torch

def summarize_text(text: str) -> str:
    try:
        logging.info("Summarization started")

        tokenizer, model = load_t5_small()

        # expects prefix
        input_text = "summarize: " + text

        inputs = tokenizer.encode(
            input_text,
            return_tensors="pt",
            max_length=512,
            truncation=True
        )

        # Generate Summary
        with torch.no_grad():
            outputs = model.generate(
                inputs,
                max_length=120,
                min_length=30,
                length_penalty=2.0,
                num_beams=4,
                early_stopping=True
            )

        summary = tokenizer.decode(outputs[0], skip_special_tokens=True)

        logging.info("Summarization completed successfully")

        return summary
    except Exception as e:
        logging.error("Error during summarization")
        raise CustomException(e, sys)