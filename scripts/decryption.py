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

def decrypt_image(encrypted_image_path, x0, r, save_path):
    encrypted_img = Image.open(encrypted_image_path).convert('L')
    encrypted_pixels = np.array(encrypted_img)
    length = encrypted_pixels.size

    key_stream = logistic_map(x0, r, length)
    key_bytes = (key_stream * 255).astype(np.uint8)

    # XOR decryption (same as encryption)
    decrypted_pixels = np.bitwise_xor(encrypted_pixels.flatten(), key_bytes).reshape(encrypted_pixels.shape)

    decrypted_img = Image.fromarray(decrypted_pixels)
    decrypted_img.save(save_path)

encrypted_folder = 'data/encrypted/'
decrypted_folder = 'results/encrypted_samples/'

os.makedirs(decrypted_folder, exist_ok=True)

# Use the same parameters as encryption
x0 = 0.5
r = 3.99

for filename in os.listdir(encrypted_folder):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp','.tiff')):
        encrypted_path = os.path.join(encrypted_folder, filename)
        decrypted_path = os.path.join(decrypted_folder, filename)
        decrypt_image(encrypted_path, x0, r, decrypted_path)
        print(f'Decrypted and saved: {filename}')
