from fastapi import FastAPI, UploadFile, File, HTTPException
from app.model import load_model
from app.utils import preprocess_image, validate_image, CLASSES
from app.schemas import PredictionResponse
import torch
import torch.nn.functional as F
from app.config import MODEL_PATH
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="Fashion CNN API")


origins = [
    "http://localhost:3000",   # React (CRA)
    "http://localhost:5173",   # React (Vite)
    "http://localhost:8080",   # React (Vite)
    "http://127.0.0.1:5173",
    "http://127.0.0.1:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      # allowed domains
    allow_credentials=True,
    allow_methods=["*"],        # GET, POST, PUT, DELETE etc.
    allow_headers=["*"],        # all headers allowed
)

# Load model once
model = load_model(MODEL_PATH)


@app.get("/")
def root():
    return {"message": "Fashion CNN API is running 🚀"}
@app.get("/health")
def root():
    return {"message": "health is good 🚀"}


@app.post("/predict", response_model=PredictionResponse)
async def predict(file: UploadFile = File(...)):
    try:
        # Validate file
        validate_image(file)

        # Read image
        image_bytes = await file.read()

        # Preprocess
        image_tensor = preprocess_image(image_bytes)

        # Prediction
        with torch.no_grad():
            outputs = model(image_tensor)
            probs = F.softmax(outputs, dim=1)
            confidence, predicted = torch.max(probs, 1)

        label = CLASSES[predicted.item()]

        return {
            "prediction": label,
            "confidence": float(confidence.item())
        }

    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))