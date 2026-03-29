import { Lock, Brain, Shuffle, Send, Unlock } from "lucide-react";

const workflowSteps = [
  {
    icon: Lock,
    title: "User Authentication",
    description:
      "The user provides an image and a secret password, which acts as the initial security input for the system.",
  },
  {
    icon: Brain,
    title: "DL-Based Key Generation",
    description:
      "A feedforward neural network processes the password and generates a secure key vector used to derive chaotic parameters.",
  },
  {
    icon: Shuffle,
    title: "Chaos-Based Encryption",
    description:
      "The image undergoes pixel permutation and value transformation using chaotic maps, producing a highly randomized encrypted image.",
  },
  {
    icon: Send,
    title: "Secure Transmission",
    description:
      "The encrypted image is transmitted over the communication channel without exposing original visual information.",
  },
  {
    icon: Unlock,
    title: "Decryption & Reconstruction",
    description:
      "Using the same password, the chaotic parameters are regenerated to accurately decrypt and reconstruct the original image.",
  },
];

const Workflow = () => {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="section-container">
        <h2 className="font-display font-bold text-2xl lg:text-3xl text-center mb-12">
          System Workflow
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="bg-card border border-border rounded-xl p-6 text-center card-hover"
              >
                <div className="icon-wrapper mx-auto mb-4">
                  <Icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Workflow;
