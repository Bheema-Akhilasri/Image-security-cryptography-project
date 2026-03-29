import { Link } from "react-router-dom";
import { Shield, Lock, Brain, Send, BarChart3, ArrowRight, Cpu, Eye } from "lucide-react";
import Layout from "@/components/Layout";
import FeatureCard from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";

/**
 * Home Page - Landing page for the Image Security project
 * Displays project overview and key features
 */
const Index = () => {
  // Feature cards data
  const features = [
    {
      icon: Lock,
      title: "Image Encryption",
      description:
        "Secure images using chaos-based cryptographic techniques that apply pixel permutation and value transformation to ensure high randomness and confidentiality during storage and transmission.",
    },
    {
      icon: Brain,
      title: "Deep Learning Security",
      description:
        "A feedforward neural network generates chaotic encryption parameters from user passwords, introducing non-linearity and high key sensitivity to strengthen resistance against brute-force attacks.",
    },
    {
      icon: Send,
      title: "Secure Communication",
      description:
        "Enables safe transmission of encrypted images between sender and receiver, ensuring confidentiality, integrity, and accurate reconstruction.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient py-20 lg:py-28">
        <div className="section-container">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            {/* Project Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full border border-primary-foreground/20 fade-in">
              <Cpu className="w-4 h-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">
                Securing data in the digital age
              </span>
            </div>

            {/* Main Title */}
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-primary-foreground leading-tight fade-in" style={{ animationDelay: '0.1s' }}>
              Improving Image Security Using Deep Learning Based on Cryptography
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto fade-in" style={{ animationDelay: '0.2s' }}>
              A comprehensive solution for secure image communication leveraging the power of neural networks and advanced cryptographic techniques.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 fade-in" style={{ animationDelay: '0.3s' }}>
              <Link to="/encrypt">
                <Button size="lg" variant="secondary" className="gap-2 font-semibold">
                  <Lock className="w-5 h-5" />
                  Encrypt Image
                </Button>
              </Link>
              <Link to="/decrypt">
                <Button size="lg" variant="outline" className="gap-2 font-semibold bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <Eye className="w-5 h-5" />
                  Decrypt Image
                </Button>
              </Link>
              <Link to="/model-info">
                <Button size="lg" variant="outline" className="gap-2 font-semibold bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <Brain className="w-5 h-5" />
                  Model Info
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4">
              Key Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our system combines traditional cryptography with modern deep learning to provide robust image security during communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={feature.title} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-24 bg-secondary/50">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A simple three-step process to secure your images for safe transmission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-display font-bold">
                1
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground">
                Upload Image
              </h3>
              <p className="text-muted-foreground">
                Select the image you want to encrypt and provide a secure secret key.
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-primary" />
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-display font-bold">
                2
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground">
                Apply Encryption
              </h3>
              <p className="text-muted-foreground">
                Our deep learning model processes and encrypts your image with advanced algorithms.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Empty space for alignment */}
            <div className="hidden md:block" />
            
            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-primary rotate-90 md:rotate-0" />
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-display font-bold">
                3
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground">
                Secure Transmission
              </h3>
              <p className="text-muted-foreground">
                Download and share the encrypted image. Only authorized users can decrypt it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            
            {/* Key Space */}
            <div className="text-center">
              <p className="font-display font-bold text-4xl text-primary mb-2">
                ~2<sup>256</sup>
              </p>
              <p className="text-sm text-muted-foreground">
                Key Space Size
              </p>
            </div>

            {/* Decryption Accuracy */}
            <div className="text-center">
              <p className="font-display font-bold text-4xl text-primary mb-2">
                ≈100%
              </p>
              <p className="text-sm text-muted-foreground">
                Decryption Accuracy
              </p>
            </div>

            {/* Processing Time */}
            <div className="text-center">
              <p className="font-display font-bold text-4xl text-primary mb-2">
                &lt; 1s
              </p>
              <p className="text-sm text-muted-foreground">
                Processing Time
              </p>
            </div>

            {/* Data Integrity */}
            <div className="text-center">
              <p className="font-display font-bold text-4xl text-primary mb-2">
                100%
              </p>
              <p className="text-sm text-muted-foreground">
                Data Integrity
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-primary">
        <div className="section-container text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-foreground mb-4">
            Ready to Secure Your Images?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Start encrypting your images now with our state-of-the-art deep learning-based cryptographic system.
          </p>
          <Link to="/encrypt">
            <Button size="lg" variant="secondary" className="font-semibold gap-2">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
