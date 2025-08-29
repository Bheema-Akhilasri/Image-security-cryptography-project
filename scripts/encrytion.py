import numpy as np
from PIL import Image
import os

def logistic_map(x0, r, length):
    x = x0
    key_stream = []
    for _ in range(length):
        x = r * x * (1 - x)
        key_stream.append(x)
    return np.array(key_stream)

def encrypt_image(image_path, x0, r, save_path):
    img = Image.open(image_path).convert('L')  # convert to grayscale
    pixels = np.array(img)
    length = pixels.size

    key_stream = logistic_map(x0, r, length)

    # Normalize key stream to 0-255 and convert to uint8
    key_bytes = (key_stream * 255).astype(np.uint8)

    # XOR encryption
    encrypted_pixels = np.bitwise_xor(pixels.flatten(), key_bytes).reshape(pixels.shape)

    # Save encrypted image
    encrypted_img = Image.fromarray(encrypted_pixels)
    encrypted_img.save(save_path)

input_folder = 'data/raw/misc/'
output_folder = 'data/encrypted/'

os.makedirs(output_folder, exist_ok=True)

# Logistic map parameters
x0 = 0.5  # initial value (between 0 and 1)
r = 3.99  # chaos control parameter, typically close to 4

# Encrypt all images in the input folder
for filename in os.listdir(input_folder):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp','.tiff')):
        input_path = os.path.join(input_folder, filename)
        output_path = os.path.join(output_folder, filename)
        encrypt_image(input_path, x0, r, output_path)
        print(f'Encrypted and saved: {filename}')
