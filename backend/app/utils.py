from PIL import Image
import torchvision.transforms as transforms
import io

# Classes mapping
CLASSES = ['T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat',
           'Sandal', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot']


def validate_image(file):
    if not file.filename.endswith((".jpg", ".jpeg", ".png")):
        raise ValueError("Only JPG, JPEG, PNG files are allowed")


def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("L")

    transform = transforms.Compose([
        transforms.Resize((28, 28)),
        transforms.ToTensor(),
        transforms.Normalize((0.5,), (0.5,))
    ])

    return transform(image).unsqueeze(0)