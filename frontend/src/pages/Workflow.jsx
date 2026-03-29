const steps = [
  {
    title: "Image Input",
    description:
      "The user selects an image and enters a secret password to initiate the secure encryption process.",
  },
  {
    title: "Password Processing",
    description:
      "The password is transformed into a numerical vector using cryptographic hashing techniques.",
  },
  {
    title: "Deep Learning Key Generation",
    description:
      "A feedforward neural network generates a secure key vector used to derive chaotic control parameters.",
  },
  {
    title: "Chaos-Based Encryption",
    description:
      "Pixel permutation and value transformation are applied using chaotic maps to produce the encrypted image.",
  },
  {
    title: "Secure Transmission",
    description:
      "The encrypted image is transmitted securely without exposing any original visual information.",
  },
  {
    title: "Decryption & Reconstruction",
    description:
      "Using the same password, chaotic parameters are regenerated to accurately reconstruct the original image.",
  },
];

export default function Workflow() {
  return (
    <div className="pt-24 px-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Project Workflow
      </h2>

      <ul className="space-y-4">
        {steps.map((step, i) => (
          <li
            key={i}
            className="bg-card p-5 rounded-xl border-l-4 border-primary"
          >
            <p className="font-semibold text-foreground mb-1">
              {step.title}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
