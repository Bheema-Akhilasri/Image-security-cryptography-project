import { useState } from "react";
import { Unlock,Lock, Download, Key, Image as ImageIcon } from "lucide-react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import ImageUpload from "@/components/ImageUpload";
import StatusMessage from "@/components/StatusMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EncryptPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [secretKey, setSecretKey] = useState("");
  const [encryptedPreview, setEncryptedPreview] = useState(null);
  const [status, setStatus] = useState(null);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [debug, setDebug] = useState(null);

  // Image select
  const handleImageSelect = (file) => {
    setSelectedImage(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);

    setStatus(null);
    setEncryptedPreview(null);
    setDebug(null);
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setEncryptedPreview(null);
    setStatus(null);
    setDebug(null);
  };

  // Encrypt
  const handleEncrypt = async () => {
    if (!selectedImage) {
      setStatus({ type: "error", message: "Please select an image." });
      return;
    }

    if (!secretKey || secretKey.length < 8) {
      setStatus({ type: "error", message: "Enter key (min 8 chars)." });
      return;
    }

    setIsEncrypting(true);
    setStatus({ type: "info", message: "Encrypting..." });

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("password", secretKey);

      const response = await fetch("http://127.0.0.1:5000/api/encrypt", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Encryption failed");
      }

      // Image preview
      const imageUrl = `http://127.0.0.1:5000${data.image_url}`;
      setEncryptedPreview(imageUrl);

      // Debug + metrics
      setDebug(data.debug);

      setStatus({ type: "success", message: "Encryption successful!" });

    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setIsEncrypting(false);
    }
  };

  // Download
  const handleDownload = async () => {
  if (!encryptedPreview) return;

  try {
    const response = await fetch(encryptedPreview);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `encrypted_${selectedImage?.name || "image"}.png`;

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error("Download failed:", error);
  }
};

  return (
    <Layout>
      <PageHeader
        title="Image Encryption"
        subtitle="Deep learning + chaos-based cryptography"
      />

      <section className="py-12 lg:py-16">
        <div className="section-container">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* LEFT */}
            <div className="space-y-6">

              <div className="bg-card p-6 rounded-xl border">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  Upload Image
                </h2>

                <ImageUpload
                  onImageSelect={handleImageSelect}
                  previewUrl={imagePreview}
                  onClear={handleClearImage}
                />
              </div>

              <div className="bg-card p-6 rounded-xl border">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Key className="w-5 h-5 text-primary" />
                  Secret Key
                </h2>

                <Input
                  type="password"
                  placeholder="Enter secret key"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                />
              </div>

              <Button
                className="w-full"
                onClick={handleEncrypt}
                disabled={isEncrypting}
              >
                {isEncrypting ? "Encrypting..." : "Encrypt Image"}
              </Button>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">

              {/* Encrypted Image */}
              <div className="bg-card p-6 rounded-xl border">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  Encrypted Image
                </h2>

                {encryptedPreview ? (
                  <>
                    <img
                      src={encryptedPreview}
                      alt="Encrypted"
                      className="w-full h-64 object-contain bg-muted rounded-lg"
                    />

                    <Button
                        size="lg"
                        variant="secondary"
                        className="w-full gap-2 mt-2"
                        onClick={handleDownload}
                      >
                        <Download className="w-5 h-5" />
                        Download Encrypted Image
                      </Button>
                  </>
                ) : (
                  <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg border-2 border-dashed border-border">
                    <div className="text-center text-muted-foreground">
                      <Unlock className="w-12 h-12 mx-auto mb-2 opacity-40" />
                        <p>Encrypted image will appear here</p>
                    </div>
                  </div>
                )}
              </div>

              {/* 🔥 DEBUG + METRICS */}
              {debug && (
                <div className="bg-card p-6 rounded-xl border space-y-4">

                  <h2 className="text-lg font-semibold">
                    🔍 Internal Working & Metrics
                  </h2>

                  {/* Key Generation */}
                  <div>
                    <h3 className="text-primary font-medium mb-2">
                      🔐 Key Generation
                    </h3>

                    <p><b>Hash:</b> {debug.hash_sample.join(", ")}</p>
                    <p><b>Normalized:</b> {debug.normalized_sample.join(", ")}</p>
                    <p><b>DL Key:</b> {debug.key_sample.join(", ")}</p>
                    <p><b>x₀:</b> {debug.x0}</p>
                    <p><b>r:</b> {debug.r}</p>
                  </div>

                  {/* Metrics */}
                  <div>
                    <h3 className="text-primary font-medium mb-2">
                      📊 Security Metrics
                    </h3>

                    <p><b>Entropy:</b> 
                      <span className="text-green-500 ml-1">
                        {debug.entropy}
                      </span>
                    </p>

                    <p className="mt-2"><b>Correlation:</b></p>
                    <ul className="ml-4 list-disc">
                      <li>Horizontal: {debug.correlation?.horizontal}</li>
                      <li>Vertical: {debug.correlation?.vertical}</li>
                      <li>Diagonal: {debug.correlation?.diagonal}</li>
                    </ul>

                    <p className="mt-2">
                      <b>NPCR:</b> {debug.npcr ?? "Calculated once"}
                    </p>
                    <p>
                      <b>UACI:</b> {debug.uaci ?? "Calculated once"}
                    </p>
                  </div>

                </div>
              )}

              {status && (
                <StatusMessage type={status.type} message={status.message} />
              )}

            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EncryptPage;