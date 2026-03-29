# --------------------------------original--------------------------------------
# from flask import Flask, request, send_file, jsonify
# from flask_cors import CORS
# import os
# import hashlib
# import uuid
# from werkzeug.utils import secure_filename

# app = Flask(__name__)
# CORS(app)

# UPLOAD_DIR = "data/raw"
# ENCRYPT_DIR = "data/encrypted"
# DECRYPT_DIR = "data/results"

# os.makedirs(UPLOAD_DIR, exist_ok=True)
# os.makedirs(ENCRYPT_DIR, exist_ok=True)
# os.makedirs(DECRYPT_DIR, exist_ok=True)

# ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg","tiff"}


# def allowed_file(filename):
#     return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


# # 🔐 Password → x0, r
# def password_to_chaos(password):
#     hash_hex = hashlib.sha256(password.encode()).hexdigest()

#     x0 = int(hash_hex[:16], 16) / (16 ** 16)              # (0,1)
#     r = 3.9 + (int(hash_hex[16:32], 16) / (16 ** 16)) * 0.1  # (3.9–4.0)

#     return x0, r


# # 🔐 ENCRYPT
# @app.route("/api/encrypt", methods=["POST"])
# def encrypt():
#     try:
#         file = request.files.get("image")
#         password = request.form.get("password")

#         if not file or not password:
#             return jsonify({"error": "Image and password required"}), 400

#         # Ensure directories exist
#         UPLOAD_DIR = "uploads"
#         ENCRYPT_DIR = "encrypted"
#         os.makedirs(UPLOAD_DIR, exist_ok=True)
#         os.makedirs(ENCRYPT_DIR, exist_ok=True)

#         # Secure input filename
#         original_filename = secure_filename(file.filename)
#         input_path = os.path.join(UPLOAD_DIR, original_filename)

#         # 🔹 Use unique temp name to avoid overwrite
#         temp_name = f"encrypted_{uuid.uuid4().hex}.png"
#         output_path = os.path.join(ENCRYPT_DIR, temp_name)

#         # Save uploaded image
#         file.save(input_path)

#         # Generate chaotic key
#         x0, r = password_to_chaos(password)

#         # Encrypt
#         from scripts.encryption import encrypt_image
#         encrypt_image(input_path, output_path, x0, r)

#         # 🔥 Send encrypted image to frontend (NO auto-save)
#         return send_file(
#             output_path,
#             mimetype="image/png",
#             as_attachment=False
#         )
#     except Exception as e:
#         print("❌ ENCRYPT ERROR:", e)
#         return jsonify({"error": str(e)}), 500


# # 🔓 DECRYPT
# @app.route("/api/decrypt", methods=["POST"])
# def decrypt():
#     try:
#         file = request.files.get("image")
#         password = request.form.get("password")

#         if not file or not password:
#             return jsonify({"error": "Encrypted image and password required"}), 400

#         if not allowed_file(file.filename):
#             return jsonify({"error": "Invalid image format"}), 400

#         # Ensure directories exist
#         ENCRYPT_DIR = "encrypted"
#         DECRYPT_DIR = "decrypted"
#         os.makedirs(ENCRYPT_DIR, exist_ok=True)
#         os.makedirs(DECRYPT_DIR, exist_ok=True)

#         uid = uuid.uuid4().hex

#         # Secure temp paths
#         encrypted_name = f"{uid}_encrypted.png"
#         decrypted_name = f"{uid}_decrypted.png"

#         input_path = os.path.join(ENCRYPT_DIR, encrypted_name)
#         output_path = os.path.join(DECRYPT_DIR, decrypted_name)

#         # Save uploaded encrypted image
#         file.save(input_path)
#         print("📁 Encrypted image saved temporarily")

#         # Generate chaotic key from password
#         x0, r = password_to_chaos(password)

#         # Perform decryption
#         from scripts.decryption import decrypt_image
#         decrypt_image(input_path, output_path, x0, r)

#         print("✅ Decryption completed")

#         # 🔥 Return decrypted image (NO auto-download)
#         return send_file(
#             output_path,
#             mimetype="image/png",
#             as_attachment=False
#         )

#     except Exception as e:
#         print("❌ ERROR:", e)
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", debug=True)
    
# --------------------------------------------------------------------------------

# from flask import Flask, request, send_file, jsonify
# from flask_cors import CORS
# import os
# import sys
# import uuid
# import numpy as np
# from werkzeug.utils import secure_filename
# import hashlib
# import torch
# import torch.nn as nn

# # --------------------------------------------------
# # 🔧 FIX IMPORT PATH (THIS IS THE IMPORTANT UPDATE)
# # --------------------------------------------------
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

# sys.path.append(PROJECT_ROOT)

# # --------------------------------------------------
# # Flask setup
# # --------------------------------------------------
# app = Flask(__name__)
# CORS(app)

# UPLOAD_DIR = os.path.join(BASE_DIR, "data", "raw")
# ENCRYPT_DIR = os.path.join(BASE_DIR, "data", "encrypted")
# DECRYPT_DIR = os.path.join(BASE_DIR, "data", "results")

# os.makedirs(UPLOAD_DIR, exist_ok=True)
# os.makedirs(ENCRYPT_DIR, exist_ok=True)
# os.makedirs(DECRYPT_DIR, exist_ok=True)

# ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "tiff"}


# def allowed_file(filename):
#     return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


# # --------------------------------------------------
# # 🔑 PyTorch DL model definition
# # --------------------------------------------------
# class DLKeyModel(nn.Module):
#     def __init__(self, input_size=16, output_size=16):
#         super().__init__()
#         self.net = nn.Sequential(
#             nn.Linear(input_size, 32),
#             nn.ReLU(),
#             nn.Linear(32, 32),
#             nn.ReLU(),
#             nn.Linear(32, output_size),
#             nn.Sigmoid()
#         )

#     def forward(self, x):
#         return self.net(x)


# # --------------------------------------------------
# # Load DL model ONCE
# # --------------------------------------------------
# MODEL_PATH = os.path.join(PROJECT_ROOT, "scripts", "dl_key_model.pt")

# model = DLKeyModel()
# model.load_state_dict(torch.load(MODEL_PATH, map_location="cpu"))
# model.eval()


# # --------------------------------------------------
# # Password → DL input
# # --------------------------------------------------
# def password_to_vector(password, length=16):
#     hash_bytes = hashlib.sha256(password.encode()).digest()
#     vector = np.frombuffer(hash_bytes, dtype=np.uint8)[:length]
#     return torch.tensor(vector / 255.0, dtype=torch.float32)


# # --------------------------------------------------
# # DL key → chaos parameters
# # --------------------------------------------------
# def key_to_chaos_params(key):
#     x0 = key[0] / 255.0
#     r = 3.57 + (key[1] / 255.0) * 0.43
#     return x0, r


# # --------------------------------------------------
# # 🔐 ENCRYPT
# # --------------------------------------------------
# @app.route("/api/encrypt", methods=["POST"])
# def encrypt():
#     try:
#         file = request.files.get("image")
#         password = request.form.get("password")

#         if not file or not password:
#             return jsonify({"error": "Image and password required"}), 400

#         if not allowed_file(file.filename):
#             return jsonify({"error": "Invalid image format"}), 400

#         input_path = os.path.join(UPLOAD_DIR, secure_filename(file.filename))
#         output_path = os.path.join(
#             ENCRYPT_DIR, f"encrypted_{uuid.uuid4().hex}.png"
#         )

#         file.save(input_path)

#         # 🔑 DL → key → x0, r
#         with torch.no_grad():
#             inp = password_to_vector(password)
#             key = model(inp).numpy()
#             key = (key * 255).astype(np.uint8)

#         x0, r = key_to_chaos_params(key)

#         from scripts.encryption import encrypt_image
#         encrypt_image(input_path, output_path, x0, r)

#         return send_file(output_path, mimetype="image/png", as_attachment=False)

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# # --------------------------------------------------
# # 🔓 DECRYPT
# # --------------------------------------------------
# @app.route("/api/decrypt", methods=["POST"])
# def decrypt():
#     try:
#         file = request.files.get("image")
#         password = request.form.get("password")

#         if not file or not password:
#             return jsonify({"error": "Image and password required"}), 400

#         if not allowed_file(file.filename):
#             return jsonify({"error": "Invalid image format"}), 400

#         input_path = os.path.join(
#             ENCRYPT_DIR, f"{uuid.uuid4().hex}_encrypted.png"
#         )
#         output_path = os.path.join(
#             DECRYPT_DIR, f"{uuid.uuid4().hex}_decrypted.png"
#         )

#         file.save(input_path)

#         # 🔑 SAME DL → SAME x0, r
#         with torch.no_grad():
#             inp = password_to_vector(password)
#             key = model(inp).numpy()
#             key = (key * 255).astype(np.uint8)

#         x0, r = key_to_chaos_params(key)

#         from scripts.decryption import decrypt_image
#         decrypt_image(input_path, output_path, x0, r)

#         return send_file(output_path, mimetype="image/png", as_attachment=False)

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# # --------------------------------------------------
# # Run server
# # --------------------------------------------------
# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000, debug=True)




















from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import os
import sys
import uuid
import numpy as np
from werkzeug.utils import secure_filename
import hashlib
import torch
import torch.nn as nn
import cv2
from scripts.metrics import calculate_entropy, calculate_correlation
from scripts.decryption import decrypt_image

# 🔥 Fix matplotlib warning
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

from scripts.metrics import (
    calculate_entropy,
    calculate_correlation,
    npcr_uaci
)

# --------------------------------------------------
# ⚙️ CONFIG
# --------------------------------------------------
NPCR_DONE = False   # 🔥 Runs only once

# --------------------------------------------------
# Setup
# --------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = BASE_DIR

sys.path.append(PROJECT_ROOT)

app = Flask(__name__)
CORS(app)

UPLOAD_DIR = os.path.join(BASE_DIR, "data", "raw")
ENCRYPT_DIR = os.path.join(BASE_DIR, "data", "encrypted")
RESULT_DIR = os.path.join(BASE_DIR, "data", "results")

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(ENCRYPT_DIR, exist_ok=True)
os.makedirs(RESULT_DIR, exist_ok=True)

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


# --------------------------------------------------
# DL Model
# --------------------------------------------------
class DLKeyModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(16, 32),
            nn.ReLU(),
            nn.Linear(32, 32),
            nn.ReLU(),
            nn.Linear(32, 16),
            nn.Sigmoid()
        )

    def forward(self, x):
        return self.net(x)


MODEL_PATH = os.path.join(PROJECT_ROOT, "scripts", "dl_key_model.pt")

model = DLKeyModel()
model.load_state_dict(torch.load(MODEL_PATH, map_location="cpu"))
model.eval()


# --------------------------------------------------
# Password → vector
# --------------------------------------------------
def password_to_vector(password):
    hash_bytes = hashlib.sha256(password.encode()).digest()
    vector = np.frombuffer(hash_bytes, dtype=np.uint8)[:16]
    return torch.tensor(vector / 255.0, dtype=torch.float32)


# --------------------------------------------------
# 🔐 ENCRYPT
# --------------------------------------------------
@app.route("/api/encrypt", methods=["POST"])
def encrypt():
    global NPCR_DONE

    try:
        file = request.files.get("image")
        password = request.form.get("password")

        if not file or not password:
            return jsonify({"error": "Image and password required"}), 400

        if not allowed_file(file.filename):
            return jsonify({"error": "Invalid image format"}), 400

        input_path = os.path.join(UPLOAD_DIR, secure_filename(file.filename))
        output_path = os.path.join(ENCRYPT_DIR, f"enc_{uuid.uuid4().hex}.png")

        file.save(input_path)

        # 🔑 DL Key
        with torch.no_grad():
            inp = password_to_vector(password)
            key = model(inp).numpy()
            key = (key * 255).astype(np.uint8)

        # 🔥 Full key usage
        chaotic_seed = np.sum(key) / (255 * len(key))
        x0 = chaotic_seed % 1.0
        r = 3.57 + (chaotic_seed % 0.43)

        from scripts.encryption import encrypt_image

        encrypt_image(input_path, output_path, x0, r)

        # -------------------------------
        # 📊 Metrics
        # -------------------------------
        img = cv2.imread(output_path)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        entropy = calculate_entropy(gray)
        corr_h, corr_v, corr_d = calculate_correlation(gray)

        print("\n=== METRICS ===")
        print("Entropy:", entropy)
        print("Corr H:", corr_h)
        print("Corr V:", corr_v)
        print("Corr D:", corr_d)

        # -------------------------------
        # 🔥 NPCR & UACI (ONLY ONCE)
        # -------------------------------
        if not NPCR_DONE:
            original = cv2.imread(input_path, 0)

            modified = original.copy()

            # Safe pixel change
            if modified[0, 0] == 255:
                modified[0, 0] = 0
            else:
                modified[0, 0] += 1

            temp_path = input_path + "_temp.png"
            cv2.imwrite(temp_path, modified)

            enc2_path = output_path + "_2.png"
            encrypt_image(temp_path, enc2_path, x0, r)

            enc1 = gray
            enc2 = cv2.imread(enc2_path, 0)

            npcr, uaci = npcr_uaci(enc1, enc2)

            print("\n=== NPCR/UACI (ONE-TIME) ===")
            print("NPCR:", npcr)
            print("UACI:", uaci)

            # Save results
            result_file = os.path.join(RESULT_DIR, "npcr_uaci.txt")
            with open(result_file, "w") as f:
                f.write(f"NPCR: {npcr}\n")
                f.write(f"UACI: {uaci}\n")

            NPCR_DONE = True  # 🔥 Prevent future runs

        # -------------------------------
        # 📊 Histogram (saved)
        # -------------------------------
        hist_path = os.path.join(RESULT_DIR, "histogram.png")

        plt.figure()
        plt.hist(gray.flatten(), bins=256)
        plt.title("Encrypted Image Histogram")
        plt.savefig(hist_path)
        plt.close()

        return send_file(output_path, mimetype="image/png")

    except Exception as e:
        return jsonify({"error": str(e)}), 500
# -------------------------------
# 📌 DECRYPT API
# -------------------------------
# --------------------------------------------------
# 🔓 DECRYPT
# --------------------------------------------------
@app.route("/api/decrypt", methods=["POST"])
def decrypt():
    try:
        file = request.files.get("image")
        password = request.form.get("password")

        if not file or not password:
            return jsonify({"error": "Image and password required"}), 400

        if not allowed_file(file.filename):
            return jsonify({"error": "Invalid image format"}), 400

        input_path = os.path.join(ENCRYPT_DIR, secure_filename(file.filename))
        output_path = os.path.join(RESULT_DIR, f"dec_{uuid.uuid4().hex}.png")

        file.save(input_path)

        # 🔑 DL Key (same as encryption)
        with torch.no_grad():
            inp = password_to_vector(password)
            key = model(inp).numpy()
            key = (key * 255).astype(np.uint8)

        # 🔥 Same chaotic parameters
        chaotic_seed = np.sum(key) / (255 * len(key))
        x0 = chaotic_seed % 1.0
        r = 3.57 + (chaotic_seed % 0.43)

        # 🔓 Decrypt
        decrypt_image(input_path, output_path, x0, r)
        # -------------------------------
# 📊 Decryption Metrics
# -------------------------------
        dec_img = cv2.imread(output_path)
        dec_gray = cv2.cvtColor(dec_img, cv2.COLOR_BGR2GRAY)

        entropy = calculate_entropy(dec_gray)
        corr_h, corr_v, corr_d = calculate_correlation(dec_gray)

        print("\n=== DECRYPTION METRICS ===")
        print("Entropy:", entropy)
        print("Corr H:", corr_h)
        print("Corr V:", corr_v)
        print("Corr D:", corr_d)

        print("✅ Decryption completed")

        return send_file(output_path, mimetype="image/png")

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# -------------------------------
# 🚀 RUN SERVER
# -------------------------------
if __name__ == '__main__':
    app.run(debug=True)