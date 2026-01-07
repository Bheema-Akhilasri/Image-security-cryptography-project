import { useState } from "react";
import ImageUpload from "../components/ImageUpload";

export default function Encrypt() {
  const [file, setFile] = useState(null);
  const [original, setOriginal] = useState(null);
  const [encrypted, setEncrypted] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEncrypt = async () => {
    if (!file) return alert("Upload an image first");

    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/encrypt", {
        method: "POST",
        body: formData,
      });

      const blob = await res.blob();
      setEncrypted(URL.createObjectURL(blob));
    } catch (err) {
      alert("Encryption failed");
    } finally {
      setLoading(false);
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
        }}
      />

      <button
        onClick={handleEncrypt}
        className="mt-6 px-5 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg"
      >
        {loading ? "Encrypting..." : "Encrypt Image"}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-card p-4 rounded-xl">
          <p className="mb-2 font-semibold">Original Image</p>
          {original && <img src={original} className="rounded-lg" />}
        </div>

        <div className="bg-card p-4 rounded-xl">
          <p className="mb-2 font-semibold">Encrypted Image</p>
          {encrypted && <img src={encrypted} className="rounded-lg" />}
        </div>
      </div>
    </div>
  );
}
