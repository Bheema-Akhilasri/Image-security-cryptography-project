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

def encrypt_image_color(image_path, x0, r, save_path):
    img = Image.open(image_path).convert('RGB')
    pixels = np.array(img)
    height, width, channels = pixels.shape

    encrypted_pixels = np.zeros_like(pixels)

    for c in range(channels):
        channel_pixels = pixels[:,:,c].flatten()
        key_stream = logistic_map(x0, r, channel_pixels.size)
        key_bytes = (key_stream * 255).astype(np.uint8)
        encrypted_channel = np.bitwise_xor(channel_pixels, key_bytes).reshape((height, width))
        encrypted_pixels[:,:,c] = encrypted_channel

    encrypted_img = Image.fromarray(encrypted_pixels)
    encrypted_img.save(save_path)

def decrypt_image_color(encrypted_image_path, x0, r, save_path):
    encrypted_img = Image.open(encrypted_image_path).convert('RGB')
    encrypted_pixels = np.array(encrypted_img)
    height, width, channels = encrypted_pixels.shape

    decrypted_pixels = np.zeros_like(encrypted_pixels)

    for c in range(channels):
        encrypted_channel = encrypted_pixels[:,:,c].flatten()
        key_stream = logistic_map(x0, r, encrypted_channel.size)
        key_bytes = (key_stream * 255).astype(np.uint8)
        decrypted_channel = np.bitwise_xor(encrypted_channel, key_bytes).reshape((height, width))
        decrypted_pixels[:,:,c] = decrypted_channel

    decrypted_img = Image.fromarray(decrypted_pixels)
    decrypted_img.save(save_path)

# Example usage for batch encryption
input_folder = 'data/raw/misc/'
encrypted_folder = 'data/encrypted/'
decrypted_folder = 'results/encrypted_samples/'

os.makedirs(encrypted_folder, exist_ok=True)
os.makedirs(decrypted_folder, exist_ok=True)

x0 = 0.5
r = 3.99

# Encrypt all images
for filename in os.listdir(input_folder):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp','.tiff')):
        input_path = os.path.join(input_folder, filename)
        encrypted_path = os.path.join(encrypted_folder, filename)
        encrypt_image_color(input_path, x0, r, encrypted_path)
        print(f'Encrypted and saved (color): {filename}')

# Decrypt all images
for filename in os.listdir(encrypted_folder):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp')):
        encrypted_path = os.path.join(encrypted_folder, filename)
        decrypted_path = os.path.join(decrypted_folder, filename)
        decrypt_image_color(encrypted_path, x0, r, decrypted_path)
        print(f'Decrypted and saved (color): {filename}')
