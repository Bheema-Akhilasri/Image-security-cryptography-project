export default function ImageUpload({ onChange }) {
  return (
    <div className="border-2 border-dashed border-primary p-6 rounded-xl text-center cursor-pointer">
      <input type="file" onChange={onChange} className="hidden" id="file" />
      <label htmlFor="file" className="text-primary">
        Drag & Drop or Click to Upload
      </label>
    </div>
  );
}
