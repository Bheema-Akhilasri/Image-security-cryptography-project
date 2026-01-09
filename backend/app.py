from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import os
import hashlib
import uuid
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

UPLOAD_DIR = "data/raw"
ENCRYPT_DIR = "data/encrypted"
DECRYPT_DIR = "data/results"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(ENCRYPT_DIR, exist_ok=True)
os.makedirs(DECRYPT_DIR, exist_ok=True)

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg","tiff"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


# 🔐 Password → x0, r
def password_to_chaos(password):
    hash_hex = hashlib.sha256(password.encode()).hexdigest()

    x0 = int(hash_hex[:16], 16) / (16 ** 16)              # (0,1)
    r = 3.9 + (int(hash_hex[16:32], 16) / (16 ** 16)) * 0.1  # (3.9–4.0)

    return x0, r


# 🔐 ENCRYPT
@app.route("/api/encrypt", methods=["POST"])
def encrypt():
    try:
        file = request.files.get("image")
        password = request.form.get("password")

        if not file or not password:
            return jsonify({"error": "Image and password required"}), 400

        # Ensure directories exist
        UPLOAD_DIR = "uploads"
        ENCRYPT_DIR = "encrypted"
        os.makedirs(UPLOAD_DIR, exist_ok=True)
        os.makedirs(ENCRYPT_DIR, exist_ok=True)

        # Secure input filename
        original_filename = secure_filename(file.filename)
        input_path = os.path.join(UPLOAD_DIR, original_filename)

        # 🔹 Use unique temp name to avoid overwrite
        temp_name = f"encrypted_{uuid.uuid4().hex}.png"
        output_path = os.path.join(ENCRYPT_DIR, temp_name)

        # Save uploaded image
        file.save(input_path)

        # Generate chaotic key
        x0, r = password_to_chaos(password)

        # Encrypt
        from scripts.encryption import encrypt_image
        encrypt_image(input_path, output_path, x0, r)

        # 🔥 Send encrypted image to frontend (NO auto-save)
        return send_file(
            output_path,
            mimetype="image/png",
            as_attachment=False
        )
    except Exception as e:
        print("❌ ENCRYPT ERROR:", e)
        return jsonify({"error": str(e)}), 500


# 🔓 DECRYPT
@app.route("/api/decrypt", methods=["POST"])
def decrypt():
    try:
        file = request.files.get("image")
        password = request.form.get("password")

        if not file or not password:
            return jsonify({"error": "Encrypted image and password required"}), 400

        if not allowed_file(file.filename):
            return jsonify({"error": "Invalid image format"}), 400

        # Ensure directories exist
        ENCRYPT_DIR = "encrypted"
        DECRYPT_DIR = "decrypted"
        os.makedirs(ENCRYPT_DIR, exist_ok=True)
        os.makedirs(DECRYPT_DIR, exist_ok=True)

        uid = uuid.uuid4().hex

        # Secure temp paths
        encrypted_name = f"{uid}_encrypted.png"
        decrypted_name = f"{uid}_decrypted.png"

        input_path = os.path.join(ENCRYPT_DIR, encrypted_name)
        output_path = os.path.join(DECRYPT_DIR, decrypted_name)

        # Save uploaded encrypted image
        file.save(input_path)
        print("📁 Encrypted image saved temporarily")

        # Generate chaotic key from password
        x0, r = password_to_chaos(password)

        # Perform decryption
        from scripts.decryption import decrypt_image
        decrypt_image(input_path, output_path, x0, r)

        print("✅ Decryption completed")

        # 🔥 Return decrypted image (NO auto-download)
        return send_file(
            output_path,
            mimetype="image/png",
            as_attachment=False
        )

    except Exception as e:
        print("❌ ERROR:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
