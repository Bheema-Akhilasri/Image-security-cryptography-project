export default function StatCard({ title, value }) {
  return (
    <div className="bg-card p-6 rounded-xl text-center">
      <h3 className="text-primary text-lg">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
