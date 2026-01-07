import ImageUpload from "../components/ImageUpload";

export default function Encrypt() {
  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Image Encryption</h2>

      <ImageUpload />

      <button className="mt-6 px-5 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg">
        Encrypt Image
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-card p-4 rounded-xl">Original Image</div>
        <div className="bg-card p-4 rounded-xl">Encrypted Image</div>
      </div>
    </div>
  );
}
