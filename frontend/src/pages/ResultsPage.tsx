import { useState } from "react";
import { BarChart3, Clock, Shield, Image as ImageIcon, RefreshCw } from "lucide-react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

/**
 * Results and Analysis Page
 * Displays encryption results, timing, and security analysis
 */
const ResultsPage = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Sample analysis data
  const analysisData = {
    encryptionTime: "0.847s",
    decryptionTime: "0.812s",
    entropy: "7.9892",
    correlation: "0.0023",
    npcr: "99.61%",
    uaci: "33.42%",
    psnr: "∞ dB",
  };

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
  };

  return (
    <Layout>
      <PageHeader
        title="Results & Analysis"
        subtitle="Comprehensive analysis of encryption performance and security metrics"
      />

      <section className="py-12 lg:py-16">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            {/* Image Comparison Section */}
            <div className="mb-12">
              <h2 className="font-display font-bold text-2xl text-foreground mb-6">
                Image Comparison
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Original Image */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Original Image</h3>
                  </div>
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                    <div className="text-center p-4">
                      <ImageIcon className="w-16 h-16 text-muted-foreground/40 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Upload an image to see comparison</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                    <p>Resolution: --</p>
                    <p>File size: --</p>
                    <p>Format: --</p>
                  </div>
                </div>

                {/* Encrypted Image */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Encrypted Image</h3>
                  </div>
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                    <div className="text-center p-4">
                      <Shield className="w-16 h-16 text-muted-foreground/40 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Encrypted result appears here</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                    <p>Entropy: --</p>
                    <p>Correlation: --</p>
                    <p>NPCR: --</p>
                  </div>
                </div>

                {/* Decrypted Image */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <ImageIcon className="w-5 h-5 text-success" />
                    <h3 className="font-semibold text-foreground">Decrypted Image</h3>
                  </div>
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                    <div className="text-center p-4">
                      <ImageIcon className="w-16 h-16 text-muted-foreground/40 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Decrypted result appears here</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                    <p>PSNR: --</p>
                    <p>SSIM: --</p>
                    <p>Match: --</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-2xl text-foreground">
                  Performance Metrics
                </h2>
                <Button onClick={handleRunAnalysis} disabled={isAnalyzing} variant="secondary" className="gap-2">
                  <RefreshCw className={`w-4 h-4 ${isAnalyzing ? "animate-spin" : ""}`} />
                  {isAnalyzing ? "Analyzing..." : "Run Analysis"}
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-card rounded-xl p-6 border border-border text-center">
                  <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="font-display font-bold text-2xl text-foreground mb-1">
                    {analysisData.encryptionTime}
                  </p>
                  <p className="text-sm text-muted-foreground">Encryption Time</p>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border text-center">
                  <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="font-display font-bold text-2xl text-foreground mb-1">
                    {analysisData.decryptionTime}
                  </p>
                  <p className="text-sm text-muted-foreground">Decryption Time</p>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border text-center">
                  <BarChart3 className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="font-display font-bold text-2xl text-foreground mb-1">
                    {analysisData.entropy}
                  </p>
                  <p className="text-sm text-muted-foreground">Entropy (bits)</p>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border text-center">
                  <Shield className="w-8 h-8 text-success mx-auto mb-3" />
                  <p className="font-display font-bold text-2xl text-foreground mb-1">
                    {analysisData.psnr}
                  </p>
                  <p className="text-sm text-muted-foreground">PSNR (Decrypted)</p>
                </div>
              </div>
            </div>

            {/* Security Analysis */}
            <div className="mb-12">
              <h2 className="font-display font-bold text-2xl text-foreground mb-6">
                Security Analysis
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Statistical Analysis */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                    Statistical Analysis
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">NPCR (Number of Pixels Change Rate)</span>
                      <span className="font-semibold text-foreground">{analysisData.npcr}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">UACI (Unified Average Changing Intensity)</span>
                      <span className="font-semibold text-foreground">{analysisData.uaci}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Correlation Coefficient</span>
                      <span className="font-semibold text-foreground">{analysisData.correlation}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Information Entropy</span>
                      <span className="font-semibold text-foreground">{analysisData.entropy}</span>
                    </div>
                  </div>
                </div>

                {/* Security Interpretation */}
                <div className="bg-card rounded-xl p-6 border border-border">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                    Security Interpretation
                  </h3>
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <div className="p-3 bg-success/10 rounded-lg border border-success/30">
                      <p className="font-medium text-foreground mb-1">✓ High Entropy</p>
                      <p>Entropy value close to 8 indicates near-maximum randomness, making the encrypted image resistant to statistical attacks.</p>
                    </div>
                    <div className="p-3 bg-success/10 rounded-lg border border-success/30">
                      <p className="font-medium text-foreground mb-1">✓ Low Correlation</p>
                      <p>Near-zero correlation coefficient confirms that adjacent pixels in the encrypted image are independent.</p>
                    </div>
                    <div className="p-3 bg-success/10 rounded-lg border border-success/30">
                      <p className="font-medium text-foreground mb-1">✓ Differential Attack Resistance</p>
                      <p>NPCR &gt; 99% and UACI ≈ 33.33% indicate strong resistance to differential cryptanalysis.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Histogram Analysis (Placeholder) */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="font-display font-bold text-xl text-foreground mb-4">
                Histogram Analysis
              </h2>
              <p className="text-muted-foreground mb-6">
                Histogram comparison shows the distribution of pixel values before and after encryption. 
                A uniform histogram in the encrypted image indicates high security.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-muted rounded-lg p-8 text-center">
                  <p className="text-muted-foreground text-sm mb-2">Original Image Histogram</p>
                  <div className="h-32 flex items-end justify-center gap-1">
                    {[40, 65, 80, 55, 90, 70, 45, 60, 75, 50, 85, 65].map((h, i) => (
                      <div
                        key={i}
                        className="w-4 bg-primary/60 rounded-t"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-8 text-center">
                  <p className="text-muted-foreground text-sm mb-2">Encrypted Image Histogram</p>
                  <div className="h-32 flex items-end justify-center gap-1">
                    {[72, 74, 71, 73, 72, 74, 73, 71, 72, 73, 74, 72].map((h, i) => (
                      <div
                        key={i}
                        className="w-4 bg-success/60 rounded-t"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                The uniform distribution in the encrypted histogram demonstrates effective encryption
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ResultsPage;
