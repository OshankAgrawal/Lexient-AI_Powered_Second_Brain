import librosa
import torch
from backend.app.services.load_models import load_whisper_medium
from backend.app.services.load_audio import load_audio
from backend.app.core.logger import logging
from backend.app.core.exception import CustomException
import sys

def transcribe_audio(file_path: str) -> str:
    try:
        logging.info("Audio transcription started")

        processor, model, device = load_whisper_medium()
        logging.info("Whisper model ready for inference...")
        model.eval()

        # Load audio
        audio = load_audio(file_path)
        logging.info("Audio file load successfully..")

        # Process input
        inputs = processor(audio, sampling_rate=16000, return_tensors="pt")
        inputs = {k: v.to(device) for k, v in inputs.items()}

        logging.info("Start transcript generation...")

        with torch.no_grad():
            generated_ids = model.generate(inputs["input_features"])

        transcription = processor.batch_decode(
            generated_ids,
            skip_special_tokens=True
        )[0]

        logging.info("Audio transcription completed")

        return transcription
    
    except Exception as e:
        logging.error(f"Error in audio transcription: {str(e)}")
        raise CustomException(e, sys)