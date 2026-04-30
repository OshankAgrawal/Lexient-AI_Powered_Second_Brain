# Lexient: AI-Powered Second Brain

## 🚀 Overview
Lexient is an AI-powered system that processes multiple input types:
- Text
- PDF
- Audio
- YouTube

## 🏗️ Architecture

Frontend (Flask) → Port 5000  
Backend (FastAPI) → Port 8000  

They communicate via REST APIs.

## 📁 Project Structure

backend/ → FastAPI + ML models  
frontend/ → Flask UI  

## ⚙️ How to Run

### 1. Backend
cd backend  
pip install -r requirements.txt  
uvicorn app.main:app --reload  

### 2. Frontend
cd frontend  
python app.py  

## 🔗 Services

Frontend → http://localhost:5000  
Backend → http://localhost:8000/docs

## 🔥 Features
- Text summarization
- PDF summarization
- Audio transcription
- YouTube processing
- Timeline tracking