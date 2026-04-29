from pydantic import BaseModel
from typing import Optional

class Note(BaseModel):
    type: str  # text / pdf / andio / youtube
    input_data: str   # original content or link
    summary: str