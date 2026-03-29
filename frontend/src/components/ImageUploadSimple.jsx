export default function ImageUpload({ onFileSelect }) {
  return (
    <div className="border-2 border-dashed border-primary p-6 rounded-xl text-center cursor-pointer">
      <input
        type="file"
        accept="image/*"
        id="file"
        className="hidden"
        onChange={(e) => onFileSelect(e.target.files[0])}
      />

      <label htmlFor="file" className="text-primary cursor-pointer">
        Drag & Drop or Click to Upload
      </label>
    </div>
  );
}
