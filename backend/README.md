# Backend - FastAPI

## Features
- Text summarization (T5)
- Audio transcription (Whisper)
- PDF processing
- YouTube processing

## Tech Stack
- FastAPI
- Transformers
- Whisper

## Run
uvicorn app.main:app --reload

## API Endpoints
POST /text  
POST /summarize-pdf  
POST /audio  
POST /youtube  

## Notes
- Uses local models
- Handles async requests