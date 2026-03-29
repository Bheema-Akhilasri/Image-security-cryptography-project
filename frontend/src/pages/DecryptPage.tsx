import { useState } from "react";
import { Unlock, Download, Key, Image as ImageIcon, AlertTriangle } from "lucide-react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import ImageUpload from "@/components/ImageUpload";
import StatusMessage from "@/components/StatusMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Image Decryption Page
 * Allows users to upload encrypted images and decrypt them with a secret key
 */
const DecryptPage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [secretKey, setSecretKey] = useState("");
  const [decryptedPreview, setDecryptedPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: "success" | "error" | "info" | "warning"; message: string } | null>(null);
  const [isDecrypting, setIsDecrypting] = useState(false);

  // Handle image selection
  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    setStatus(null);
    setDecryptedPreview(null);
  };

  // Clear selected image
  const handleClearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setDecryptedPreview(null);
    setStatus(null);
  };

  // Simulate decryption process (frontend demo)
  const handleDecrypt = async () => {
  if (!selectedImage) {
    setStatus({ type: "error", message: "Please select an encrypted image to decrypt." });
    return;
  }

  if (!secretKey || secretKey.length < 8) {
    setStatus({ type: "error", message: "Please enter the correct secret key (minimum 8 characters)." });
    return;
  }

  setIsDecrypting(true);
  setStatus({ type: "info", message: "Decrypting image..." });

  try {
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("password", secretKey);

    const response = await fetch("http://127.0.0.1:5000/api/decrypt", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || "Decryption failed");
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    setDecryptedPreview(imageUrl);
    setStatus({ type: "success", message: "Image decrypted successfully!" });
  } catch (error: any) {
    setStatus({ type: "error", message: error.message || "Decryption failed" });
  } finally {
    setIsDecrypting(false);
  }
};


  // Download decrypted image
  const handleDownload = () => {
    if (!decryptedPreview) return;
    
    const link = document.createElement("a");
    link.href = decryptedPreview;
    link.download = `decrypted_${selectedImage?.name || "image"}.png`;
    link.click();
  };

  return (
    <Layout>
      <PageHeader
        title="Image Decryption"
        subtitle="Decrypt encrypted images using the correct secret key"
      />

      <section className="py-12 lg:py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            {/* Warning Banner */}
            <div className="mb-8 p-4 bg-warning/10 border border-warning/30 rounded-lg flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Important Security Notice</p>
                <p className="text-sm text-muted-foreground">
                  Ensure you use the exact same secret key that was used during encryption. 
                  An incorrect key will result in corrupted output.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <div className="space-y-6">
                <div className="bg-card rounded-xl p-6 border border-border card-hover">
                  <h2 className="font-display font-semibold text-xl text-foreground mb-4 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    Upload Encrypted Image
                  </h2>
                  
                  <ImageUpload
                    onImageSelect={handleImageSelect}
                    label="Select Encrypted Image"
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
                      Enter the decryption key used during encryption
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
                      The key must match the one used for encryption.
                    </p>
                  </div>
                </div>

                {/* Decrypt Button */}
                <Button
                  size="lg"
                  className="w-full gap-2"
                  onClick={handleDecrypt}
                  disabled={isDecrypting || !selectedImage}
                >
                  <Unlock className="w-5 h-5" />
                  {isDecrypting ? "Decrypting..." : "Decrypt Image"}
                </Button>
              </div>

              {/* Result Section */}
              <div className="space-y-6">
                <div className="bg-card rounded-xl p-6 border border-border card-hover min-h-[300px]">
                  <h2 className="font-display font-semibold text-xl text-foreground mb-4 flex items-center gap-2">
                    <Unlock className="w-5 h-5 text-primary" />
                    Decrypted Image Preview
                  </h2>

                  {decryptedPreview ? (
                    <div className="space-y-4">
                      <div className="rounded-lg overflow-hidden border border-border">
                        <img
                          src={decryptedPreview}
                          alt="Decrypted"
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
                        Download Decrypted Image
                      </Button>
                    </div>
                  ) : (
                    <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg border-2 border-dashed border-border">
                      <div className="text-center text-muted-foreground">
                        <Unlock className="w-12 h-12 mx-auto mb-2 opacity-40" />
                        <p>Decrypted image will appear here</p>
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

export default DecryptPage;
