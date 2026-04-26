import sys
from app.core.exception import CustomException
from app.core.logger import logging

import librosa
import soundfile as sf

# Safe audio loader
def load_audio(file_path):
    logging.info("Start loading audio file....")
    try:

        try:
            # First try librosa
            audio, sr = librosa.load(file_path, sr=16000)
        except Exception:
            # Fallback using soundfile
            audio, sr = sf.read(file_path)

            # Convert to mono if stereo
            if len(audio.shape) > 1:
                audio = audio.mean(axis=1)

            # Resample to 16kHz
            audio = librosa.resample(audio, orig_sr=sr, target_sr=16000)

        return audio
    
    except Exception as e:
        logging.error("Error in loading audio file")
        raise CustomException(e, sys)