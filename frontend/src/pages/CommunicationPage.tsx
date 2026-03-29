import { useState } from "react";
import { Send, Lock, Unlock, ArrowRight, User, Radio, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import ImageUpload from "@/components/ImageUpload";
import StatusMessage from "@/components/StatusMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Secure Communication Page
 * Simulates sender-receiver encrypted image transmission
 */
const CommunicationPage = () => {
  // Sender state
  const [senderImage, setSenderImage] = useState<File | null>(null);
  const [senderPreview, setSenderPreview] = useState<string | null>(null);
  const [senderKey, setSenderKey] = useState("");
  
  // Transmission state
  const [transmittedImage, setTransmittedImage] = useState<string | null>(null);
  const [transmissionStatus, setTransmissionStatus] = useState<"idle" | "encrypting" | "transmitting" | "transmitted" | "decrypting" | "complete">("idle");
  
  // Receiver state
  const [receiverKey, setReceiverKey] = useState("");
  const [decryptedImage, setDecryptedImage] = useState<string | null>(null);

  // Handle sender image selection
  const handleSenderImageSelect = (file: File) => {
    setSenderImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setSenderPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    // Reset transmission
    setTransmittedImage(null);
    setDecryptedImage(null);
    setTransmissionStatus("idle");
  };

  // Simulate encryption and transmission
  const handleEncryptAndSend = async () => {
    if (!senderImage || !senderKey || senderKey.length < 8) return;

    setTransmissionStatus("encrypting");
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Create encrypted version
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = senderPreview!;
    
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const keyChar = senderKey.charCodeAt(i % senderKey.length);
      data[i] = (data[i] + keyChar * 7) % 256;
      data[i + 1] = (data[i + 1] + keyChar * 11) % 256;
      data[i + 2] = (data[i + 2] + keyChar * 13) % 256;
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    setTransmissionStatus("transmitting");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setTransmittedImage(canvas.toDataURL("image/png"));
    setTransmissionStatus("transmitted");
  };

  // Simulate decryption on receiver side
  const handleDecrypt = async () => {
    if (!transmittedImage || !receiverKey || receiverKey.length < 8) return;

    setTransmissionStatus("decrypting");
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = transmittedImage;
    
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const keyChar = receiverKey.charCodeAt(i % receiverKey.length);
      data[i] = (data[i] - keyChar * 7 + 256 * 100) % 256;
      data[i + 1] = (data[i + 1] - keyChar * 11 + 256 * 100) % 256;
      data[i + 2] = (data[i + 2] - keyChar * 13 + 256 * 100) % 256;
    }
    
    ctx.putImageData(imageData, 0, 0);
    setDecryptedImage(canvas.toDataURL("image/png"));
    setTransmissionStatus("complete");
  };

  // Get status message based on current state
  const getStatusMessage = () => {
    switch (transmissionStatus) {
      case "encrypting":
        return { type: "info" as const, message: "Encrypting image with deep learning model..." };
      case "transmitting":
        return { type: "info" as const, message: "Transmitting encrypted image through secure channel..." };
      case "transmitted":
        return { type: "success" as const, message: "Image transmitted successfully! Waiting for receiver to decrypt." };
      case "decrypting":
        return { type: "info" as const, message: "Receiver is decrypting the image..." };
      case "complete":
        return { type: "success" as const, message: "Secure communication complete! Image successfully decrypted by receiver." };
      default:
        return null;
    }
  };

  const statusMessage = getStatusMessage();

  return (
    <Layout>
      <PageHeader
        title="Secure Communication"
        subtitle="Simulate end-to-end encrypted image transmission between sender and receiver"
      />

      <section className="py-12 lg:py-16">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            {/* Transmission Status Bar */}
            <div className="mb-8 p-4 bg-card rounded-xl border border-border">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <Radio className={`w-5 h-5 ${transmissionStatus !== "idle" ? "text-success pulse-dot" : "text-muted-foreground"}`} />
                  <span className="font-medium text-foreground">Transmission Status:</span>
                </div>
                <div className="flex items-center gap-2">
                  {["idle", "encrypting", "transmitting", "transmitted", "decrypting", "complete"].map((step, index) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          ["idle", "encrypting", "transmitting", "transmitted", "decrypting", "complete"].indexOf(transmissionStatus) >= index
                            ? "bg-primary"
                            : "bg-muted"
                        }`}
                      />
                      {index < 5 && <div className={`w-8 h-0.5 ${["idle", "encrypting", "transmitting", "transmitted", "decrypting", "complete"].indexOf(transmissionStatus) > index ? "bg-primary" : "bg-muted"}`} />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Status Message */}
            {statusMessage && (
              <div className="mb-8">
                <StatusMessage type={statusMessage.type} message={statusMessage.message} />
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sender Section */}
              <div className="space-y-6">
                <div className="bg-card rounded-xl p-6 border border-border card-hover">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="font-display font-semibold text-lg text-foreground">Sender</h2>
                      <p className="text-xs text-muted-foreground">Encrypt & Send</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <ImageUpload
                      onImageSelect={handleSenderImageSelect}
                      label="Upload Image"
                      previewUrl={senderPreview}
                      onClear={() => {
                        setSenderImage(null);
                        setSenderPreview(null);
                        setTransmittedImage(null);
                        setDecryptedImage(null);
                        setTransmissionStatus("idle");
                      }}
                    />

                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Encryption Key</Label>
                      <Input
                        type="password"
                        placeholder="Enter secret key..."
                        value={senderKey}
                        onChange={(e) => setSenderKey(e.target.value)}
                        className="font-mono"
                      />
                    </div>

                    <Button
                      className="w-full gap-2"
                      onClick={handleEncryptAndSend}
                      disabled={!senderImage || senderKey.length < 8 || transmissionStatus !== "idle"}
                    >
                      <Lock className="w-4 h-4" />
                      Encrypt & Send
                    </Button>
                  </div>
                </div>
              </div>

              {/* Transmission Channel */}
              <div className="flex flex-col items-center justify-center">
                <div className="hidden lg:flex flex-col items-center gap-4 w-full">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-sm font-medium">Secure Channel</span>
                  </div>
                  
                  <div className="relative w-full">
                    <div className="h-1 bg-muted rounded-full">
                      <div
                        className={`h-full bg-primary rounded-full transition-all duration-1000 ${
                          transmissionStatus === "transmitting" || transmissionStatus === "transmitted" || transmissionStatus === "decrypting" || transmissionStatus === "complete"
                            ? "w-full"
                            : transmissionStatus === "encrypting"
                            ? "w-1/3"
                            : "w-0"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Encrypted Preview */}
                  {transmittedImage && (
                    <div className="bg-card rounded-xl p-4 border border-border w-full">
                      <p className="text-xs text-muted-foreground mb-2 text-center">Encrypted Data</p>
                      <img
                        src={transmittedImage}
                        alt="Encrypted"
                        className="w-full h-32 object-contain bg-muted rounded-lg"
                      />
                    </div>
                  )}

                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>

                {/* Mobile arrow */}
                <div className="lg:hidden py-4">
                  <ArrowRight className="w-8 h-8 text-primary rotate-90" />
                </div>
              </div>

              {/* Receiver Section */}
              <div className="space-y-6">
                <div className="bg-card rounded-xl p-6 border border-border card-hover">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center">
                      <User className="w-5 h-5 text-success-foreground" />
                    </div>
                    <div>
                      <h2 className="font-display font-semibold text-lg text-foreground">Receiver</h2>
                      <p className="text-xs text-muted-foreground">Receive & Decrypt</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Received encrypted image */}
                    <div className={`h-40 rounded-lg border-2 border-dashed border-border flex items-center justify-center ${transmittedImage ? "bg-muted" : "bg-muted/50"}`}>
                      {transmittedImage ? (
                        <div className="text-center p-4">
                          <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Encrypted image received</p>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">Waiting for transmission...</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Decryption Key</Label>
                      <Input
                        type="password"
                        placeholder="Enter secret key..."
                        value={receiverKey}
                        onChange={(e) => setReceiverKey(e.target.value)}
                        className="font-mono"
                        disabled={!transmittedImage}
                      />
                    </div>

                    <Button
                      className="w-full gap-2"
                      variant="secondary"
                      onClick={handleDecrypt}
                      disabled={!transmittedImage || receiverKey.length < 8 || transmissionStatus === "decrypting" || transmissionStatus === "complete"}
                    >
                      <Unlock className="w-4 h-4" />
                      Decrypt Image
                    </Button>

                    {/* Decrypted Result */}
                    {decryptedImage && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">Decrypted Image:</p>
                        <img
                          src={decryptedImage}
                          alt="Decrypted"
                          className="w-full h-40 object-contain bg-muted rounded-lg border border-border"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CommunicationPage;
