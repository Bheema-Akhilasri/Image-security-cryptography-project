import { useState } from "react";
import ImageUpload from "../components/ImageUpload";

export default function Decrypt() {
  const [file, setFile] = useState(null);
  const [encrypted, setEncrypted] = useState(null);
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

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Decryption failed");
      }

      const blob = await res.blob();
      setDecryptedBlob(blob);
      setDecrypted(URL.createObjectURL(blob));
    } catch (err) {
      alert("❌ Wrong password or invalid image");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Save with folder picker
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
          setEncrypted(URL.createObjectURL(f));
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
        className="mt-6 px-5 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg"
      >
        {loading ? "Decrypting..." : "Decrypt Image"}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-card p-4 rounded-xl">
          <p className="mb-2 font-semibold">Encrypted Image</p>
          {encrypted && <img src={encrypted} className="rounded-lg" />}
        </div>

        <div className="bg-card p-4 rounded-xl">
          <p className="mb-2 font-semibold">Decrypted Image</p>
          {decrypted && <img src={decrypted} className="rounded-lg" />}

          {decrypted && (
            <button
              onClick={handleSave}
              className="mt-4 px-5 py-2 bg-green-500 rounded-lg font-semibold"
            >
              Save Decrypted Image
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
