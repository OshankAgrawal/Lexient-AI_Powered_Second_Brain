from pymongo import MongoClient
from backend.app.core.logger import logging

MONGO_URI = "mongodb://localhost:27017"

client = MongoClient(MONGO_URI)

db = client["lexient_db"]

notes_collection = db["notes"]

logging.info("MongoDB connected successfully")