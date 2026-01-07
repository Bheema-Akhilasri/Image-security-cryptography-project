const steps = [
  "Image Input",
  "Preprocessing",
  "Deep Learning Key Generation",
  "Encryption",
  "Secure Transmission",
  "Decryption",
];

export default function Workflow() {
  return (
    <div className="pt-24 px-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-8">Project Workflow</h2>
      <ul className="space-y-4">
        {steps.map((step, i) => (
          <li key={i} className="bg-card p-4 rounded-xl border-l-4 border-primary">
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
}
