from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

UPLOAD_DIR = "data/raw"
ENCRYPT_DIR = "data/encrypted"
DECRYPT_DIR = "data/results"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(ENCRYPT_DIR, exist_ok=True)
os.makedirs(DECRYPT_DIR, exist_ok=True)

# 🔐 Chaotic encryption keys (SECRET)
X0 = 0.123456
R = 3.99


@app.route("/api/encrypt", methods=["POST"])
def encrypt():
    file = request.files.get("image")
    if not file:
        return jsonify({"error": "No image uploaded"}), 400

    input_path = os.path.join(UPLOAD_DIR, "input.png")
    output_path = os.path.join(ENCRYPT_DIR, "encrypted.png")

    file.save(input_path)
    print("✅ Input image saved")

    from scripts.encryption import encrypt_image
    encrypt_image(input_path, output_path, X0, R)

    print("🔐 Encrypted image saved at:", output_path)

    return send_file(output_path, mimetype="image/png")


@app.route("/api/decrypt", methods=["POST"])
def decrypt():
    try:
        print("📥 Encrypted image received for decryption")

        file = request.files.get("image")
        if not file:
            return jsonify({"error": "No image uploaded"}), 400

        input_path = os.path.join(ENCRYPT_DIR, "encrypted.png")
        output_path = os.path.join(DECRYPT_DIR, "decrypted.png")

        file.save(input_path)
        print("📁 Saved encrypted image at:", input_path)

        from scripts.decryption import decrypt_image_with_key

        # MUST MATCH ENCRYPTION
        x0 = 0.123456
        r = 3.99

        decrypt_image_with_key(input_path, output_path, x0, r)

        print("✅ Decryption completed, sending file")
        return send_file(output_path, mimetype="image/png")

    except Exception as e:
        print("❌ DECRYPTION ERROR:", e)
        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
