import ImageUpload from "../components/ImageUpload";

export default function Decrypt() {
  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Image Decryption</h2>

      <ImageUpload />

      <button className="mt-6 px-5 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg">
        Decrypt Image
      </button>

      <div className="bg-card p-4 rounded-xl mt-8">
        Decrypted Image Output
      </div>
    </div>
  );
}
