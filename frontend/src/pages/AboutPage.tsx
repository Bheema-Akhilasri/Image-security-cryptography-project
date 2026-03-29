import { BookOpen, Code, Lightbulb, CheckCircle, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";

/**
 * About Project Page
 * Contains abstract, technologies, future enhancements, and conclusion
 */
const AboutPage = () => {
  // Technologies used
  const technologies = [
    { category: "Deep Learning", items: ["PyTorch", "Feedforward Neural Networks", "Autoencoder Architecture"] },
    { category: "Cryptography", items: ["AES-256 Encryption", "Key Derivation Functions", "Secure Hash Algorithms"] },
    { category: "Frontend", items: ["React.js", "TypeScript", "Tailwind CSS", "Vite"] },
    { category: "Backend", items: ["Python", "Flask/FastAPI", "NumPy", "OpenCV"] },
  ];

  // Future enhancements
  const futureEnhancements = [
    "Implementation of quantum-resistant encryption algorithms",
    "Real-time video encryption support",
    "Mobile application development (iOS/Android)",
    "Integration with cloud storage services",
    "Multi-party secure computation support",
    "Hardware acceleration using GPU/TPU",
    "Blockchain-based key management",
    "Steganography integration for enhanced security",
  ];

  return (
    <Layout>
      <PageHeader
        title="About the Project"
        subtitle="Learn more about our research and development approach"
      />

      <section className="py-12 lg:py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Abstract */}
            <div className="bg-card rounded-xl p-8 border border-border">
              <div className="flex items-start gap-4">
                <div className="icon-wrapper flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                    Abstract
                  </h2>
                  <div className="prose prose-sm text-muted-foreground space-y-4">
                    <p>
                      In the era of digital communication, ensuring the security and privacy of 
                      transmitted images has become paramount. This project presents a novel approach 
                      to image encryption that leverages deep learning techniques combined with 
                      traditional cryptographic methods to achieve enhanced security.
                    </p>
                    <p>
                      Our proposed system utilizes a convolutional neural network (CNN) architecture 
                      that learns optimal encryption patterns based on the input image and a user-provided 
                      secret key. Unlike conventional encryption algorithms that apply uniform 
                      transformations, our deep learning-based approach adapts to the unique 
                      characteristics of each image, resulting in superior encryption quality.
                    </p>
                    <p>
                      The system achieves near-maximum entropy values (approaching 8 bits), extremely 
                      low correlation coefficients, and demonstrates strong resistance against various 
                      cryptanalytic attacks including differential attacks, statistical attacks, and 
                      brute-force attempts. The encryption and decryption processes are optimized for 
                      real-time performance, making the system practical for everyday use.
                    </p>
                    <p>
                      This research contributes to the field of secure image communication by 
                      demonstrating that deep learning can effectively enhance traditional cryptographic 
                      methods, opening new possibilities for intelligent security systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technologies Used */}
            <div className="bg-card rounded-xl p-8 border border-border">
              <div className="flex items-start gap-4">
                <div className="icon-wrapper flex-shrink-0">
                  <Code className="w-6 h-6 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="font-display font-bold text-2xl text-foreground mb-6">
                    Technologies Used
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {technologies.map((tech) => (
                      <div key={tech.category} className="space-y-3">
                        <h3 className="font-semibold text-foreground text-lg">{tech.category}</h3>
                        <ul className="space-y-2">
                          {tech.items.map((item) => (
                            <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Future Enhancements */}
            <div className="bg-card rounded-xl p-8 border border-border">
              <div className="flex items-start gap-4">
                <div className="icon-wrapper flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="font-display font-bold text-2xl text-foreground mb-6">
                    Future Enhancements
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {futureEnhancements.map((enhancement, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg"
                      >
                        <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{enhancement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div className="bg-primary rounded-xl p-8">
              <h2 className="font-display font-bold text-2xl text-primary-foreground mb-4">
                Conclusion
              </h2>
              <div className="prose prose-sm text-primary-foreground/90 space-y-4">
                <p>
                  This project successfully demonstrates the integration of deep learning with 
                  cryptographic techniques for secure image communication. The proposed system 
                  achieves high security standards while maintaining practical performance levels 
                  suitable for real-world applications.
                </p>
                <p>
                  Key achievements of this project include:
                </p>
                <ul className="space-y-2 list-none p-0">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    Near-maximum entropy (7.99 bits) in encrypted images
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    Sub-second encryption and decryption times
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    Strong resistance to differential and statistical attacks
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    User-friendly interface for easy adoption
                  </li>
                </ul>
                <p>
                  The research opens new avenues for exploring intelligent security systems and 
                  demonstrates the potential of combining machine learning with traditional 
                  security methods for enhanced data protection.
                </p>
              </div>
            </div>

            {/* Project Team (Optional) */}
            <div className="bg-card rounded-xl p-8 border border-border text-center">
              <h2 className="font-display font-bold text-xl text-foreground mb-2">
                Final Year Engineering Project
              </h2>
              <p className="text-muted-foreground mb-4">
                Department of Computer Science & Engineering
              </p>
              <p className="text-sm text-muted-foreground">
                Academic Year 2024-2025
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
