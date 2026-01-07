# import numpy as np
# from PIL import Image
# import os

# def logistic_map(x0, r, length):
#     x = x0
#     key_stream = []
#     for _ in range(length):
#         x = r * x * (1 - x)
#         key_stream.append(x)
#     return np.array(key_stream)

# def encrypt_image_color(image_path, x0, r, save_path):
#     img = Image.open(image_path).convert('RGB')
#     pixels = np.array(img)
#     height, width, channels = pixels.shape

#     encrypted_pixels = np.zeros_like(pixels)

#     for c in range(channels):
#         channel_pixels = pixels[:,:,c].flatten()
#         key_stream = logistic_map(x0, r, channel_pixels.size)
#         key_bytes = (key_stream * 255).astype(np.uint8)
#         encrypted_channel = np.bitwise_xor(channel_pixels, key_bytes).reshape((height, width))
#         encrypted_pixels[:,:,c] = encrypted_channel

#     encrypted_img = Image.fromarray(encrypted_pixels)
#     encrypted_img.save(save_path)

# def decrypt_image_color(encrypted_image_path, x0, r, save_path):
#     encrypted_img = Image.open(encrypted_image_path).convert('RGB')
#     encrypted_pixels = np.array(encrypted_img)
#     height, width, channels = encrypted_pixels.shape

#     decrypted_pixels = np.zeros_like(encrypted_pixels)

#     for c in range(channels):
#         encrypted_channel = encrypted_pixels[:,:,c].flatten()
#         key_stream = logistic_map(x0, r, encrypted_channel.size)
#         key_bytes = (key_stream * 255).astype(np.uint8)
#         decrypted_channel = np.bitwise_xor(encrypted_channel, key_bytes).reshape((height, width))
#         decrypted_pixels[:,:,c] = decrypted_channel

#     decrypted_img = Image.fromarray(decrypted_pixels)
#     decrypted_img.save(save_path)

# # Example usage for batch encryption
# input_folder = 'data/raw/misc/'
# encrypted_folder = 'data/encrypted/'
# decrypted_folder = 'results/encrypted_samples/'

# os.makedirs(encrypted_folder, exist_ok=True)
# os.makedirs(decrypted_folder, exist_ok=True)

# x0 = 0.5
# r = 3.99

# # Encrypt all images
# for filename in os.listdir(input_folder):
#     if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp','.tiff')):
#         input_path = os.path.join(input_folder, filename)
#         encrypted_path = os.path.join(encrypted_folder, filename)
#         encrypt_image_color(input_path, x0, r, encrypted_path)
#         print(f'Encrypted and saved (color): {filename}')

# # Decrypt all images
# for filename in os.listdir(encrypted_folder):
#     if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp')):
#         encrypted_path = os.path.join(encrypted_folder, filename)
#         decrypted_path = os.path.join(decrypted_folder, filename)
#         decrypt_image_color(encrypted_path, x0, r, decrypted_path)
#         print(f'Decrypted and saved (color): {filename}')

# ==============================key generation encrypt-decrypt======================================================

# import hashlib
# import numpy as np
# from PIL import Image

# # Derive x0 and r from password
# def derive_parameters_from_password(password):
#     hash_digest = hashlib.sha256(password.encode()).hexdigest()

#     # Use first 16 chars for x0
#     x0_hex = hash_digest[:16]
#     x0_int = int(x0_hex, 16)
#     x0 = (x0_int / (2**64))
#     x0 = max(min(x0, 0.9999), 0.0001)  # Clamp to avoid extremes

#     # Use next 16 chars for r
#     r_hex = hash_digest[16:32]
#     r_int = int(r_hex, 16)
#     r = 3.57 + (r_int / (2**64)) * (4 - 3.57)  # Scale to range 3.57 - 4

#     return x0, r

# # Logistic map key stream generator
# def logistic_map(x0, r, length):
#     x = x0
#     key_stream = []
#     for _ in range(length):
#         x = r * x * (1 - x)
#         key_stream.append(x)
#     return np.array(key_stream)

# # Encrypt color image using password
# def encrypt_image_color(image_path, password, save_path):
#     x0, r = derive_parameters_from_password(password)
#     img = Image.open(image_path).convert('RGB')
#     pixels = np.array(img)
#     height, width, channels = pixels.shape

#     encrypted_pixels = np.zeros_like(pixels)

#     for c in range(channels):
#         channel = pixels[:,:,c].flatten()
#         key_stream = logistic_map(x0, r, channel.size)
#         key_bytes = (key_stream * 255).astype(np.uint8)
#         encrypted_channel = np.bitwise_xor(channel, key_bytes).reshape((height, width))
#         encrypted_pixels[:,:,c] = encrypted_channel

#     encrypted_img = Image.fromarray(encrypted_pixels)
#     encrypted_img.save(save_path)

# # Decrypt color image using password
# def decrypt_image_color(encrypted_image_path, password, save_path):
#     x0, r = derive_parameters_from_password(password)
#     encrypted_img = Image.open(encrypted_image_path).convert('RGB')
#     encrypted_pixels = np.array(encrypted_img)
#     height, width, channels = encrypted_pixels.shape

#     decrypted_pixels = np.zeros_like(encrypted_pixels)

#     for c in range(channels):
#         encrypted_channel = encrypted_pixels[:,:,c].flatten()
#         key_stream = logistic_map(x0, r, encrypted_channel.size)
#         key_bytes = (key_stream * 255).astype(np.uint8)
#         decrypted_channel = np.bitwise_xor(encrypted_channel, key_bytes).reshape((height, width))
#         decrypted_pixels[:,:,c] = decrypted_channel

#     decrypted_img = Image.fromarray(decrypted_pixels)
#     decrypted_img.save(save_path)

# # Usage example
# password = 'shinchan@123'
# input_image = 'data/raw/misc/4.2.03.tiff'  # Path to your original image
# encrypted_image = 'encrypted_image3.png'  # File to save encrypted image
# decrypted_image = 'decrypted_image3.png'  # File to save decrypted image

# encrypt_image_color(input_image, password, encrypted_image)
# print('Image encrypted.')

# decrypt_image_color(encrypted_image, password, decrypted_image)
# print('Image decrypted.')

import cv2
import numpy as np

# ---------- Logistic Map Function ----------
def logistic_map(x, r, size):
    seq = np.zeros(size)
    seq[0] = x
    for i in range(1, size):
        seq[i] = r * seq[i - 1] * (1 - seq[i - 1])
    return seq

# ---------- Encryption Function ----------
def encrypt_image_value_based(input_path, encrypted_path, x0=0.5, r=3.99):
    # Read and convert image
    img = cv2.imread(input_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    h, w, c = img.shape

    # Flatten the image
    img_flat = img.flatten()

    # Generate chaotic sequence
    chaotic_seq = logistic_map(x0, r, len(img_flat))

    # Scale chaotic values to [0, 255]
    chaotic_seq = np.floor(chaotic_seq * 256) % 256

    # XOR operation for value encryption
    encrypted_flat = np.bitwise_xor(img_flat.astype(np.uint8), chaotic_seq.astype(np.uint8))

    # Reshape and save encrypted image
    encrypted_img = encrypted_flat.reshape((h, w, c))
    cv2.imwrite(encrypted_path, cv2.cvtColor(encrypted_img, cv2.COLOR_RGB2BGR))
    print(f"✅ Encrypted image saved as: {encrypted_path}")

    return encrypted_img, chaotic_seq

# ---------- Decryption Function ----------
def decrypt_image_value_based(encrypted_img, chaotic_seq, output_path):
    h, w, c = encrypted_img.shape
    encrypted_flat = encrypted_img.flatten()

    # XOR again to decrypt
    decrypted_flat = np.bitwise_xor(encrypted_flat.astype(np.uint8), chaotic_seq.astype(np.uint8))
    decrypted_img = decrypted_flat.reshape((h, w, c))

    # Save decrypted image
    cv2.imwrite(output_path, cv2.cvtColor(decrypted_img, cv2.COLOR_RGB2BGR))
    print(f"✅ Decrypted image saved as: {output_path}")

# ---------- Example Run ----------
if __name__ == "__main__":
    input_path = "../data/raw/misc/4.2.06.tiff"
    encrypted_path = "encrypted_value1.png"
    decrypted_path = "decrypted_value1.png"

    encrypted_img, seq = encrypt_image_value_based(input_path, encrypted_path)
    decrypt_image_value_based(encrypted_img, seq, decrypted_path)
