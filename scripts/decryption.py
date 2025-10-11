# import hashlib
# import numpy as np
# from PIL import Image
# import json

# # Derive x0 and r from a key string
# def derive_parameters_from_key(key):
#     hash_digest = hashlib.sha256(key.encode()).hexdigest()

#     # Use first 16 chars for x0
#     x0_hex = hash_digest[:16]
#     x0_int = int(x0_hex, 16)
#     x0 = (x0_int / (2**64))
#     x0 = max(min(x0, 0.9999), 0.0001)

#     # Use next 16 chars for r
#     r_hex = hash_digest[16:32]
#     r_int = int(r_hex, 16)
#     r = 3.57 + (r_int / (2**64)) * (4 - 3.57)

#     return x0, r

# # Logistic map key stream generator
# def logistic_map(x0, r, length):
#     x = x0
#     key_stream = []
#     for _ in range(length):
#         x = r * x * (1 - x)
#         key_stream.append(x)
#     return np.array(key_stream)

# # Decrypt image using key file
# def decrypt_image_color(encrypted_image_path, key_path, save_path):
#     # Load key string from JSON file
#     with open(key_path, "r") as f:
#         key_data = json.load(f)
#     key = key_data["key"]

#     # Derive chaotic parameters
#     x0, r = derive_parameters_from_key(key)

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
#     print(f"✅ Decrypted image saved at: {save_path}")

# # ====================== Example Usage =========================

# encrypted_image = "encrypted_image2.png"
# decrypted_image = "decrypted_image2.png"
# key_file = "encryptionkey.json"

# decrypt_image_color(encrypted_image, key_file, decrypted_image)


import numpy as np
from PIL import Image
from encrytion import logistic_map  # Reuse the same logistic map

# ---------- Decryption Function ----------
def decrypt_image(encrypted_path, output_path, x0, r):
    # Load the encrypted image
    encrypted_image = Image.open(encrypted_path).convert("RGB")
    img_array = np.array(encrypted_image)
    shape = img_array.shape

    # Regenerate chaotic sequence using same key
    num_pixels = shape[0] * shape[1]
    chaotic_seq = logistic_map(x0, r, num_pixels)

    # Generate the same shuffle indices
    shuffle_indices = np.argsort(chaotic_seq)

    # Create reverse mapping
    reverse_indices = np.zeros_like(shuffle_indices)
    reverse_indices[shuffle_indices] = np.arange(num_pixels)

    # Flatten and unshuffle
    shuffled_flat = img_array.reshape(-1, shape[2])
    original_flat = shuffled_flat[reverse_indices]
    original_img = original_flat.reshape(shape)

    # Save decrypted image
    Image.fromarray(original_img).save(output_path)
    print(f"✅ Decryption complete! Original image saved as: {output_path}")

# ---------- Example ----------
decrypt_image("encrypted_pixel2.png", "decrypted_pixel2.png", x0=0.123456, r=3.99)


