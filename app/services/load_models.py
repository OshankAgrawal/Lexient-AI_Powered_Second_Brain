import sys
import os
from app.core.exception import CustomException
from app.core.logger import logging

import torch
from transformers import AutoProcessor, AutoModelForSpeechSeq2Seq
from transformers import T5Tokenizer, T5ForConditionalGeneration

local_path_t5 = os.path.join(os.getcwd(), "t5_local_model")
local_path_whishper = os.path.join(os.getcwd(), "whisper_local_model")

# Global cache for t5_small model (So model load only once not every run)
t5_tokenizer = None
t5_model = None

# Global cache for Whishper_medium model
whisper_processor = None
whisper_model = None
whisper_device = None

def load_t5_small():
    global t5_tokenizer, t5_model

    if t5_tokenizer is not None and t5_model is not None:
        return t5_tokenizer, t5_model
    
    logging.info("Loading t5-small model for FIRST time.......")
        
    try:
        # Load Model Once
        t5_tokenizer = T5Tokenizer.from_pretrained(local_path_t5, local_files_only=True)
        t5_model = T5ForConditionalGeneration.from_pretrained(local_path_t5, local_files_only=True)

        t5_model.eval()

        logging.info(f"T5_small Model loaded from disk....")

        return t5_tokenizer, t5_model
    
    except Exception as e:
        raise CustomException(e, sys)
    

def load_whisper_medium():
    global whisper_processor, whisper_model, whisper_device

    if whisper_processor is not None and whisper_model is not None:
        return whisper_processor, whisper_model, whisper_device
    
    logging.info("Loading whisper_medium model for FIRST time.......")

    try:
        # Load model once
        whisper_device = "cuda" if torch.cuda.is_available() else "cpu"

        whisper_processor = AutoProcessor.from_pretrained(local_path_whishper, local_files_only=True)
        whisper_model = AutoModelForSpeechSeq2Seq.from_pretrained(local_path_whishper, local_files_only=True)

        whisper_model.to(whisper_device)
        whisper_model.eval()

        logging.info(f"Whisper_medium model loaded on {whisper_device}")

        return whisper_processor, whisper_model, whisper_device
    
    except Exception as e:
        raise CustomException(e, sys)