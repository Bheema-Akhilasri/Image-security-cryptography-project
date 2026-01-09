import { useState, useEffect } from "react";
import ImageUpload from "../components/ImageUpload";

export default function Encrypt() {
  const [file, setFile] = useState(null);
  const [original, setOriginal] = useState(null);
  const [encrypted, setEncrypted] = useState(null);
  const [encryptedBlob, setEncryptedBlob] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (original) URL.revokeObjectURL(original);
      if (encrypted) URL.revokeObjectURL(encrypted);
    };
  }, [original, encrypted]);

  const handleEncrypt = async () => {
    if (!file) return alert("Upload an image first");
    if (!password) return alert("Enter encryption password");

    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("password", password);

    try {
      const res = await fetch("/api/encrypt", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Encryption failed");

      const blob = await res.blob();
      setEncryptedBlob(blob);
      setEncrypted(URL.createObjectURL(blob));
    } catch (err) {
      alert("Encryption failed");
    } finally {
      setLoading(false);
    }
  };

  // 💾 Save encrypted image
  const handleSave = async () => {
    if (!encryptedBlob) return;

    if (!window.showSaveFilePicker) {
      alert("Save dialog not supported in this browser");
      return;
    }

    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: "encrypted_image.png",
        types: [
          {
            description: "PNG Image",
            accept: { "image/png": [".png"] },
          },
        ],
      });

      const writable = await handle.createWritable();
      await writable.write(encryptedBlob);
      await writable.close();
    } catch {
      console.log("Save cancelled");
    }
  };

  return (
  <div className="pt-24 px-6 max-w-6xl mx-auto">
    <h2 className="text-2xl font-bold mb-6">Image Encryption</h2>

    <ImageUpload
      onFileSelect={(f) => {
        setFile(f);
        setOriginal(URL.createObjectURL(f));
        setEncrypted(null);
        setEncryptedBlob(null);
      }}
    />

    <input
      type="password"
      placeholder="Enter encryption password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="mt-4 w-full md:w-1/2 px-4 py-2 rounded-lg bg-card border border-gray-600"
    />

    <button
      onClick={handleEncrypt}
      disabled={loading}
      className="mt-6 px-5 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg disabled:opacity-60"
    >
      {loading ? "Encrypting..." : "Encrypt Image"}
    </button>

    {/* SIDE BY SIDE USING FLEX */}
    <div
      style={{
        display: "flex",
        gap: "24px",
        marginTop: "40px",
      }}
    >
      {/* ORIGINAL IMAGE */}
      <div style={{ flex: 1 }} className="bg-card p-4 rounded-xl">
        <h3 className="text-lg font-semibold mb-3">Original Image</h3>

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
          {original ? (
            <img
              src={original}
              alt="Original"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          ) : (
            <p className="text-gray-400">No image selected</p>
          )}
        </div>
      </div>

      {/* ENCRYPTED IMAGE */}
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
          {encrypted ? (
            <img
              src={encrypted}
              alt="Encrypted"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          ) : (
            <p className="text-gray-400">Not encrypted yet</p>
          )}
        </div>

        {encrypted && (
          <button
            onClick={handleSave}
            style={{ marginTop: "16px" }}
            className="px-5 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold"
          >
            Save Encrypted Image
          </button>
        )}
      </div>
    </div>
  </div>
);

}
