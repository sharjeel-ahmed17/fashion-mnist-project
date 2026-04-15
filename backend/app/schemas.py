# Pydantic schemas placeholder
from pydantic import BaseModel, Field


class PredictionResponse(BaseModel):
    prediction: str = Field(..., example="Sneaker")
    confidence: float = Field(..., example=0.92)