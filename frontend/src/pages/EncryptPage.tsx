import { useState } from "react";
import { Lock, Download, Key, Image as ImageIcon } from "lucide-react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import ImageUpload from "@/components/ImageUpload";
import StatusMessage from "@/components/StatusMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Image Encryption Page
 * Allows users to upload and encrypt images with a secret key
 */
const EncryptPage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [secretKey, setSecretKey] = useState("");
  const [encryptedPreview, setEncryptedPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: "success" | "error" | "info" | "warning"; message: string } | null>(null);
  const [isEncrypting, setIsEncrypting] = useState(false);

  // Handle image selection
  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    setStatus(null);
    setEncryptedPreview(null);
  };

  // Clear selected image
  const handleClearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setEncryptedPreview(null);
    setStatus(null);
  };

  // Simulate encryption process (frontend demo)
  const handleEncrypt = async () => {
  if (!selectedImage) {
    setStatus({ type: "error", message: "Please select an image to encrypt." });
    return;
  }

  if (!secretKey || secretKey.length < 8) {
    setStatus({ type: "error", message: "Please enter a secret key (minimum 8 characters)." });
    return;
  }

  setIsEncrypting(true);
  setStatus({ type: "info", message: "Encrypting image..." });

  try {
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("password", secretKey);

    const response = await fetch("http://127.0.0.1:5000/api/encrypt", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || "Encryption failed");
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    setEncryptedPreview(imageUrl);
    setStatus({ type: "success", message: "Image encrypted successfully!" });
  } catch (error: any) {
    setStatus({ type: "error", message: error.message || "Encryption failed" });
  } finally {
    setIsEncrypting(false);
  }
};

    
  // Download encrypted image
  const handleDownload = () => {
    if (!encryptedPreview) return;
    
    const link = document.createElement("a");
    link.href = encryptedPreview;
    link.download = `encrypted_${selectedImage?.name || "image"}.png`;
    link.click();
  };

  return (
    <Layout>
      <PageHeader
        title="Image Encryption"
        subtitle="Encrypt your images using our deep learning-based cryptographic algorithm"
      />

      <section className="py-12 lg:py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <div className="space-y-6">
                <div className="bg-card rounded-xl p-6 border border-border card-hover">
                  <h2 className="font-display font-semibold text-xl text-foreground mb-4 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    Upload Original Image
                  </h2>
                  
                  <ImageUpload
                    onImageSelect={handleImageSelect}
                    label="Select Image to Encrypt"
                    previewUrl={imagePreview}
                    onClear={handleClearImage}
                  />
                </div>

                {/* Secret Key Input */}
                <div className="bg-card rounded-xl p-6 border border-border card-hover">
                  <h2 className="font-display font-semibold text-xl text-foreground mb-4 flex items-center gap-2">
                    <Key className="w-5 h-5 text-primary" />
                    Secret Key
                  </h2>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secretKey" className="text-sm text-muted-foreground">
                      Enter encryption key (minimum 8 characters)
                    </Label>
                    <Input
                      id="secretKey"
                      type="password"
                      placeholder="Enter your secret key..."
                      value={secretKey}
                      onChange={(e) => setSecretKey(e.target.value)}
                      className="font-mono"
                    />
                    <p className="text-xs text-muted-foreground">
                      Keep this key safe! You'll need it to decrypt the image.
                    </p>
                  </div>
                </div>

                {/* Encrypt Button */}
                <Button
                  size="lg"
                  className="w-full gap-2"
                  onClick={handleEncrypt}
                  disabled={isEncrypting || !selectedImage}
                >
                  <Lock className="w-5 h-5" />
                  {isEncrypting ? "Encrypting..." : "Encrypt Image"}
                </Button>
              </div>

              {/* Result Section */}
              <div className="space-y-6">
                <div className="bg-card rounded-xl p-6 border border-border card-hover min-h-[300px]">
                  <h2 className="font-display font-semibold text-xl text-foreground mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-primary" />
                    Encrypted Image Preview
                  </h2>

                  {encryptedPreview ? (
                    <div className="space-y-4">
                      <div className="rounded-lg overflow-hidden border border-border">
                        <img
                          src={encryptedPreview}
                          alt="Encrypted"
                          className="w-full h-64 object-contain bg-muted"
                        />
                      </div>
                      <Button
                        size="lg"
                        variant="secondary"
                        className="w-full gap-2"
                        onClick={handleDownload}
                      >
                        <Download className="w-5 h-5" />
                        Download Encrypted Image
                      </Button>
                    </div>
                  ) : (
                    <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg border-2 border-dashed border-border">
                      <div className="text-center text-muted-foreground">
                        <Lock className="w-12 h-12 mx-auto mb-2 opacity-40" />
                        <p>Encrypted image will appear here</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Status Message */}
                {status && (
                  <StatusMessage type={status.type} message={status.message} className="fade-in" />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EncryptPage;
