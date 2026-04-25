import sys
from app.core.exception import CustomException
from app.core.logger import logging

import torch
from transformers import AutoProcessor, AutoModelForSpeechSeq2Seq
from transformers import T5Tokenizer, T5ForConditionalGeneration

local_path_t5 = "./t5_local_model"
local_path_whishper = "./whishper_local_model"

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
    

def load_whishper_medium():
    global whishper_processor, whishper_model, whishper_device

    if whishper_processor is not None and whishper_model is not None:
        return whishper_processor, whishper_model, whishper_device
    
    logging.info("Loading whisper_medium model for FIRST time.......")

    try:
        # Load model once
        whishper_device = "cuda" if torch.cuda.is_available() else "cpu"

        whishper_processor = AutoProcessor.from_pretrained(local_path_whishper, local_files_only=True)
        whishper_model = AutoModelForSpeechSeq2Seq.from_pretrained(local_path_whishper, local_files_only=True)

        whishper_model.to(whishper_device)
        whishper_model.eval()

        logging.info(f"Whisper_medium model loaded on {whishper_device}")

        return whishper_processor, whishper_model, whishper_device
    
    except Exception as e:
        raise CustomException(e, sys)