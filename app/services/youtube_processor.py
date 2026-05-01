from youtube_transcript_api import YouTubeTranscriptApi
from app.core.logger import logging
from app.core.exception import CustomException
import sys
import re

def extract_video_id(url: str) -> str:
    try:
        # Handle multiple formats
        patterns = [
            r"v=([^&]+)",
            r"youtu\.be/([^?]+)"
        ]

        for pattern in patterns:
            match = re.search(pattern, url)
            if match:
                return match.group(1)
            
        raise ValueError("Invalid YouTube URL")
    
    except Exception as e:
        raise CustomException(e, sys)
    

def get_transcript(url: str) -> str:
    try:
        logging.info("YouTube transcription extraction started")

        video_id = extract_video_id(url)

        transcript = YouTubeTranscriptApi().fetch(video_id)

        text = " ".join([item.text for item in transcript])

        logging.info("Transcript fetched successfully")

        return text
    
    except Exception as e:
        logging.error(f"Error fetching transcript: {str(e)}")
        raise CustomException(e, sys)