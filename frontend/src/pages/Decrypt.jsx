import { useState } from "react";
import ImageUpload from "../components/ImageUpload";

export default function Decrypt() {
  const [file, setFile] = useState(null);
  const [decrypted, setDecrypted] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDecrypt = async () => {
    if (!file) return alert("Upload encrypted image");

    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/decrypt", {
        method: "POST",
        body: formData,
      });

      const blob = await res.blob();
      setDecrypted(URL.createObjectURL(blob));
    } catch {
      alert("Decryption failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Image Decryption</h2>

      <ImageUpload
        onFileSelect={(f) => {
          setFile(f);
          setDecrypted(null);
        }}
      />

      <button
        onClick={handleDecrypt}
        className="mt-6 px-5 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg"
      >
        {loading ? "Decrypting..." : "Decrypt Image"}
      </button>

      <div className="bg-card p-4 rounded-xl mt-8">
        <p className="font-semibold mb-2">Decrypted Image</p>
        {decrypted && <img src={decrypted} className="rounded-lg" />}
      </div>
    </div>
  );
}
