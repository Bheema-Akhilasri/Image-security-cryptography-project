import { useState } from "react";
import ImageUpload from "../components/ImageUpload";

export default function Decrypt() {
  const [file, setFile] = useState(null);
  const [encryptedPreview, setEncryptedPreview] = useState(null);
  const [decrypted, setDecrypted] = useState(null);
  const [decryptedBlob, setDecryptedBlob] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDecrypt = async () => {
    if (!file) return alert("Upload encrypted image");
    if (!password) return alert("Enter password");

    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("password", password);

    try {
      const res = await fetch("/api/decrypt", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Decryption failed");

      const blob = await res.blob();
      setDecryptedBlob(blob);
      setDecrypted(URL.createObjectURL(blob));
    } catch (err) {
      alert("❌ Wrong password or invalid image");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!decryptedBlob) return;

    if (!window.showSaveFilePicker) {
      alert("Browser does not support folder picker");
      return;
    }

    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: `decrypted_${file?.name || "image.png"}`,
        types: [
          {
            description: "PNG Image",
            accept: { "image/png": [".png"] },
          },
        ],
      });

      const writable = await handle.createWritable();
      await writable.write(decryptedBlob);
      await writable.close();
    } catch {
      console.log("Save cancelled");
    }
  };

  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Image Decryption</h2>

      <ImageUpload
        onFileSelect={(f) => {
          setFile(f);
          setEncryptedPreview(URL.createObjectURL(f));
          setDecrypted(null);
          setDecryptedBlob(null);
        }}
      />

      <input
        type="password"
        placeholder="Enter decryption password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-4 w-full md:w-1/2 px-4 py-2 rounded-lg bg-card border border-gray-600"
      />

      <button
        onClick={handleDecrypt}
        disabled={loading}
        className="mt-6 px-5 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg disabled:opacity-60"
      >
        {loading ? "Decrypting..." : "Decrypt Image"}
      </button>

      {/* SIDE BY SIDE */}
      <div style={{ display: "flex", gap: "24px", marginTop: "40px" }}>
        
        {/* ENCRYPTED */}
        <div style={{ flex: 1 }} className="bg-card p-4 rounded-xl">
          <h3 className="text-lg font-semibold mb-3">Encrypted Image</h3>

          <div
            style={{
              height: "350px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.2)",
              borderRadius: "12px",
            }}
          >
            {encryptedPreview ? (
              <img
                src={encryptedPreview}
                alt="Encrypted"
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
              />
            ) : (
              <p className="text-gray-400">No image selected</p>
            )}
          </div>
        </div>

        {/* DECRYPTED */}
        <div style={{ flex: 1 }} className="bg-card p-4 rounded-xl">
          <h3 className="text-lg font-semibold mb-3">Decrypted Image</h3>

          <div
            style={{
              height: "350px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(0,0,0,0.2)",
              borderRadius: "12px",
            }}
          >
            {decrypted ? (
              <img
                src={decrypted}
                alt="Decrypted"
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
              />
            ) : (
              <p className="text-gray-400">Not decrypted yet</p>
            )}
          </div>

          {decrypted && (
            <button
              onClick={handleSave}
              style={{ marginTop: "16px" }}
              className="px-5 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold"
            >
              Save Decrypted Image
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
