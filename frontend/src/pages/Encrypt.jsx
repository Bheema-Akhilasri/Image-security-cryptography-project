import { useState, useEffect } from "react";
import ImageUpload from "../components/ImageUpload";

export default function Encrypt() {
  const [file, setFile] = useState(null);
  const [original, setOriginal] = useState(null);
  const [encrypted, setEncrypted] = useState(null);
  const [encryptedBlob, setEncryptedBlob] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // cleanup URLs
  useEffect(() => {
    return () => {
      if (original) URL.revokeObjectURL(original);
      if (encrypted) URL.revokeObjectURL(encrypted);
    };
  }, [original, encrypted]);

  const handleEncrypt = async () => {
    if (!file) return alert("Upload an image first");
    if (!password) return alert("Enter password");

    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("password", password);

    try {
      const res = await fetch("/api/encrypt", {
        method: "POST",
        body: formData,
      });

      const blob = await res.blob();
      setEncryptedBlob(blob);
      setEncrypted(URL.createObjectURL(blob));
    } catch {
      alert("Encryption failed");
    } finally {
      setLoading(false);
    }
  };

  // 💾 SAVE BUTTON (Folder dialog)
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
            description: "Image Files",
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
    <div className="pt-24 px-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Image Encryption</h2>

      <ImageUpload
        onFileSelect={(f) => {
          setFile(f);
          setOriginal(URL.createObjectURL(f)); // 🔥 THIS MAKES PNG SHOW
          setEncrypted(null);
          setEncryptedBlob(null);
        }}
      />

      <input
        type="password"
        placeholder="Enter encryption password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-4 w-full md:w-1/2 px-4 py-2 rounded-lg bg-card border"
      />

      <button
        onClick={handleEncrypt}
        disabled={loading}
        className="mt-6 px-5 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg"
      >
        {loading ? "Encrypting..." : "Encrypt Image"}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* ORIGINAL */}
        <div className="bg-card p-4 rounded-xl">
          <p className="font-semibold mb-2">Original Image</p>
          {original ? (
            <img src={original} className="rounded-lg" />
          ) : (
            <p className="text-gray-400">No image selected</p>
          )}
        </div>

        {/* ENCRYPTED */}
        <div className="bg-card p-4 rounded-xl">
          <p className="font-semibold mb-2">Encrypted Image</p>

          {encrypted ? (
            <>
              <img src={encrypted} className="rounded-lg" />

              {/* 💾 SAVE BUTTON */}
              <button
                onClick={handleSave}
                className="mt-4 px-5 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold"
              >
                Save Encrypted Image
              </button>
            </>
          ) : (
            <p className="text-gray-400">Not encrypted yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
