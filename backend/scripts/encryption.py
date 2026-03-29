
# import hashlib
# import numpy as np
# from PIL import Image
# import json
# import secrets  # for random key generation

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

# # Encrypt image and save key
# def encrypt_image_color(image_path, save_path, key_path, password=None):
#     # If user doesn’t provide a password, generate random one
#     if password is None:
#         password = secrets.token_hex(16)  # 32-char hex key

#     x0, r = derive_parameters_from_key(password)
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

#     # Save encrypted image
#     encrypted_img = Image.fromarray(encrypted_pixels)
#     encrypted_img.save(save_path)

#     # Save only the key (string) into JSON
#     key_data = {"key": password}
#     with open(key_path, "w") as f:
#         json.dump(key_data, f)

#     print(f"✅ Encrypted image saved at: {save_path}")
#     print(f"🔑 Key saved at: {key_path}")
#     print(f"🔐 Encryption Key: {password}")  # Show key for reference

# # ====================== Example Usage =========================

# input_image = "data/raw/misc/4.1.02.tiff"
# encrypted_image = "encrypted_image2.png"
# key_file = "encryption_key.json"

# # If you want auto-generated random key:
# encrypt_image_color(input_image, encrypted_image, key_file)

# # If you want to use a custom password:
# # encrypt_image_color(input_image, encrypted_image, key_file, password="shinchan@123")

# import numpy as np
# from PIL import Image

# ---------- Logistic Map Function ----------
# def logistic_map(x0, r, size):
#     seq = np.zeros(size)
#     x = x0
#     for i in range(size):
#         x = r * x * (1 - x)
#         seq[i] = x
#     return seq

# # ---------- Encryption Function ----------
# def encrypt_image(input_path, output_path, x0, r):
#     # Load the image
#     image = Image.open(input_path).convert("RGB")
#     img_array = np.array(image)
#     shape = img_array.shape

#     # Generate chaotic sequence
#     num_pixels = shape[0] * shape[1]
#     chaotic_seq = logistic_map(x0, r, num_pixels)

#     # Get permutation indices from chaotic sequence
#     shuffle_indices = np.argsort(chaotic_seq)

#     # Flatten the image for shuffling
#     flat_img = img_array.reshape(-1, shape[2])
#     shuffled_flat = flat_img[shuffle_indices]
#     shuffled_img = shuffled_flat.reshape(shape)

#     # Save encrypted image
#     Image.fromarray(shuffled_img).save(output_path)
#     print(f"✅ Encryption complete! Encrypted image saved as: {output_path}")

# # ---------- Example ----------
# encrypt_image("data/raw/misc/4.2.03.tiff", "encrypted_pixel2.png", x0=0.123456, r=3.99)


# import numpy as np
# from PIL import Image

# # ---------- Logistic Map Function ----------
# def logistic_map(x0, r, size):
#     seq = np.zeros(size)
#     x = x0
#     for i in range(size):
#         x = r * x * (1 - x)
#         seq[i] = x
#     return seq

# # ---------- Encryption Function ----------
# def encrypt_image(input_path, output_path, x0, r):
#     # Load image
#     image = Image.open(input_path).convert("RGB")
#     img_array = np.array(image)
#     shape = img_array.shape

#     # Generate chaotic sequence
#     num_pixels = shape[0] * shape[1]
#     chaotic_seq = logistic_map(x0, r, num_pixels)

#     # ---------- Step 1: Position-based permutation ----------
#     shuffle_indices = np.argsort(chaotic_seq)
#     flat_img = img_array.reshape(-1, shape[2])
#     shuffled_flat = flat_img[shuffle_indices]

#     # ---------- Step 2: Value-based XOR diffusion ----------
#     # Scale chaotic sequence to [0, 255] and match RGB channels
#     chaotic_vals = (chaotic_seq * 255).astype(np.uint8)
#     chaotic_vals = np.repeat(chaotic_vals[:, np.newaxis], 3, axis=1)

#     encrypted_flat = shuffled_flat ^ chaotic_vals
#     encrypted_img = encrypted_flat.reshape(shape)

#     # Save encrypted image
#     Image.fromarray(encrypted_img).save(output_path)
#     print(f"✅ Encryption complete! Saved as: {output_path}")

#     # Save permutation indices for decryption
#     np.save("data/encrypted/shuffle_key.npy", shuffle_indices)
#     print("🔑 Shuffle key saved as 'shuffle_key.npy'")

# # ---------- Example ----------
# if __name__ == "__main__":
#     encrypt_image(
#         input_path="../data/raw/misc/4.2.03.tiff",
#         output_path="encrypted_combined5.png",
#         x0=0.123456,
#         r=3.99
#     )


#------------------original----------------------

# import numpy as np
# from PIL import Image

# def logistic_map(x0, r, size):
#     seq = np.zeros(size)
#     x = x0
#     for i in range(size):
#         x = r * x * (1 - x)
#         seq[i] = x
#     return seq

# def encrypt_image(input_path, output_path, x0, r):
#     image = Image.open(input_path).convert("RGB")
#     img_array = np.array(image)
#     h, w, c = img_array.shape

#     num_pixels = h * w
#     chaotic_seq = logistic_map(x0, r, num_pixels)

#     shuffle_indices = np.argsort(chaotic_seq)
#     flat_img = img_array.reshape(num_pixels, c)
#     shuffled_flat = flat_img[shuffle_indices]

#     chaotic_vals = (chaotic_seq * 255).astype(np.uint8)
#     chaotic_vals = np.repeat(chaotic_vals[:, np.newaxis], 3, axis=1)

#     encrypted_flat = shuffled_flat ^ chaotic_vals
#     encrypted_img = encrypted_flat.reshape(h, w, c)

#     Image.fromarray(encrypted_img).save(output_path)

# -----------------------------------------------------------

# import numpy as np
# from PIL import Image

# # ---------- Logistic Map (UNCHANGED) ----------
# def logistic_map(x0, r, size):
#     seq = np.zeros(size)
#     x = x0
#     for i in range(size):
#         x = r * x * (1 - x)
#         seq[i] = x
#     return seq


# # ---------- DL Key → Chaos Parameters ----------
# def key_to_chaos_params(key):
#     """
#     key: numpy array (uint8, 0–255) generated by DL model
#     returns: x0 in (0,1), r in (3.57, 4)
#     """
#     x0 = key[0] / 255.0
#     r = 3.57 + (key[1] / 255.0) * 0.43
#     return x0, r


# # ---------- Image Encryption (LOGIC UNCHANGED) ----------
# def encrypt_image(input_path, output_path, key):
#     image = Image.open(input_path).convert("RGB")
#     img_array = np.array(image)
#     h, w, c = img_array.shape

#     num_pixels = h * w

#     # 🔑 Get x0, r from DL key (ONLY CHANGE)
#     x0, r = key_to_chaos_params(key)

#     chaotic_seq = logistic_map(x0, r, num_pixels)

#     # ---------- PERMUTATION (UNCHANGED) ----------
#     shuffle_indices = np.argsort(chaotic_seq)
#     flat_img = img_array.reshape(num_pixels, c)
#     shuffled_flat = flat_img[shuffle_indices]

#     # ---------- DIFFUSION (UNCHANGED) ----------
#     chaotic_vals = (chaotic_seq * 255).astype(np.uint8)
#     chaotic_vals = np.repeat(chaotic_vals[:, np.newaxis], 3, axis=1)

#     encrypted_flat = shuffled_flat ^ chaotic_vals
#     encrypted_img = encrypted_flat.reshape(h, w, c)

#     Image.fromarray(encrypted_img).save(output_path)






import numpy as np
from PIL import Image


def logistic_map(x0, r, size):
    seq = np.zeros(size)
    x = x0

    # stabilization
    for _ in range(100):
        x = r * x * (1 - x)

    for i in range(size):
        x = r * x * (1 - x)
        seq[i] = x

    return seq


def encrypt_image(input_path, output_path, x0, r):
    image = Image.open(input_path).convert("RGB")
    img_array = np.array(image)
    h, w, c = img_array.shape

    num_pixels = h * w

    chaotic_seq = logistic_map(x0, r, num_pixels)

    # ---------------------------------
    # ✅ SINGLE STRONG PERMUTATION
    # ---------------------------------
    perm_indices = np.argsort(chaotic_seq)

    flat = img_array.reshape(num_pixels, c)
    shuffled = flat[perm_indices]
    shuffled = shuffled.reshape(h, w, c)

    # ---------------------------------
    # ✅ CONTROLLED DIFFUSION
    # ---------------------------------
    chaotic_vals = (chaotic_seq * 255).astype(np.uint8)
    chaotic_vals = chaotic_vals.reshape(num_pixels, 1)
    chaotic_vals = np.repeat(chaotic_vals, 3, axis=1)

    flat_shuffled = shuffled.reshape(num_pixels, c)
    encrypted = np.zeros_like(flat_shuffled)

    prev = np.array([0, 0, 0], dtype=np.uint8)

    for i in range(num_pixels):
        encrypted[i] = flat_shuffled[i] ^ chaotic_vals[i] ^ prev
        prev = encrypted[i]

    encrypted_img = encrypted.reshape(h, w, c)

    Image.fromarray(encrypted_img).save(output_path)