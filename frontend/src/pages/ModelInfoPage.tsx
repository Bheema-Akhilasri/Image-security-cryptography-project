

import { Brain, Cpu, Layers, Zap, Shield, BarChart, Network, Database, Key } from "lucide-react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import FeatureCard from "@/components/FeatureCard";

/**
 * Deep Learning Model Information Page
 * Explains the role of deep learning in key generation
 */
const ModelInfoPage = () => {
  // Model features
  const modelFeatures = [
    {
      icon: Network,
      title: "Feedforward Neural Network",
      description: "A fully connected feedforward neural network is used to learn a non-linear mapping for secure key generation.",
    },
    {
      icon: Layers,
      title: "Multi-Layer Architecture",
      description: "The network consists of multiple dense layers that transform the input vector into a secure key representation.",
    },
    {
      icon: Key,
      title: "DL-Based Key Generation",
      description: "Deep learning is used only to generate chaotic key parameters, not to encrypt the image directly.",
    },
    {
      icon: Shield,
      title: "Enhanced Security",
      description: "Non-linear DL-based parameter generation increases resistance against brute-force and analytical attacks.",
    },
  ];

  // Performance metrics (representative / academic)
  const metrics = [
    { label: "Key Generation Accuracy", value: "≈100%", description: "Deterministic key reproduction" },
    { label: "Key Length", value: "128-bit", description: "DL-generated key vector" },
    { label: "Parameter Sensitivity", value: "High", description: "Strong chaos sensitivity" },
    { label: "PSNR Value", value: ">40 dB", description: "After decryption" },
  ];

  return (
    <Layout>
      <PageHeader
        title="Deep Learning Model"
        subtitle="Role of feedforward neural network in secure key generation"
      />

      <section className="py-12 lg:py-16">
        <div className="section-container">
          <div className="max-w-5xl mx-auto">

            {/* Introduction */}
            <div className="bg-card rounded-xl p-8 border border-border mb-12">
              <div className="flex items-start gap-4">
                <div className="icon-wrapper flex-shrink-0">
                  <Brain className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h2 className="font-display font-semibold text-2xl text-foreground mb-4">
                    Why Deep Learning in This System?
                  </h2>
                  <div className="prose prose-sm text-muted-foreground space-y-4">
                    <p>
                      In this project, deep learning is not used to encrypt image data directly.
                      Instead, a feedforward neural network is employed to generate secure and
                      unpredictable chaotic parameters that act as encryption keys.
                    </p>
                    <p>
                      The neural network learns a non-linear transformation from a password-derived
                      input vector to a key vector. This key is then used to derive the initial
                      conditions of a chaotic system.
                    </p>
                    <p>
                      By combining deep learning with chaos-based cryptography, the system achieves
                      enhanced security while preserving the mathematical rigor and reversibility
                      required for reliable decryption.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Architecture Section */}
            <div className="mb-12">
              <h2 className="font-display font-bold text-2xl text-foreground mb-6 text-center">
                Model Architecture
              </h2>

              <div className="bg-card rounded-xl p-8 border border-border">
                <div className="mb-8">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                    Feedforward Network Structure
                  </h3>
                  <div className="bg-muted rounded-lg p-6 font-mono text-sm overflow-x-auto">
                    <pre className="text-foreground">
{`┌───────────────────────────────────────────────┐
│           INPUT VECTOR (Password Hash)         │
│                 16 Features                    │
└─────────────────────────┬─────────────────────┘
                          │
┌─────────────────────────▼─────────────────────┐
│          Dense Layer (32 neurons)              │
│                ReLU Activation                 │
└─────────────────────────┬─────────────────────┘
                          │
┌─────────────────────────▼─────────────────────┐
│          Dense Layer (32 neurons)              │
│                ReLU Activation                 │
└─────────────────────────┬─────────────────────┘
                          │
┌─────────────────────────▼─────────────────────┐
│        OUTPUT LAYER (Key Vector)               │
│            Sigmoid Activation                  │
└───────────────────────────────────────────────┘`}
                    </pre>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Layers className="w-5 h-5 text-primary" />
                      Network Characteristics
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Fully connected feedforward architecture</li>
                      <li>• No recurrence or convolution</li>
                      <li>• Non-linear key transformation</li>
                      <li>• Deterministic output for same input</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-primary" />
                      Integration with Encryption
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• DL output used to derive x₀ and r</li>
                      <li>• Logistic map for chaos generation</li>
                      <li>• Pixel permutation and XOR diffusion</li>
                      <li>• Perfect reconstruction on decryption</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-12">
              <h2 className="font-display font-bold text-2xl text-foreground mb-6 text-center">
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {modelFeatures.map((feature, index) => (
                  <div key={feature.title}>
                    <FeatureCard {...feature} />
                  </div>
                ))}
              </div>
            </div>

            {/* Training Details
            <div className="bg-card rounded-xl p-8 border border-border">
              <h2 className="font-display font-semibold text-2xl text-foreground mb-6 flex items-center gap-3">
                <Database className="w-6 h-6 text-primary" />
                Training Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-foreground">Training Data</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Synthetic numeric vectors</li>
                    <li>• Password-derived hash inputs</li>
                    <li>• No image data used for training</li>
                  </ul>
                </div>
              </div>
            </div> */}

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ModelInfoPage;
