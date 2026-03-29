import StatCard from "../components/StatCard";

export default function Metrics() {
  return (
    <div className="pt-24 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="PSNR" value="45.8 dB" />
      <StatCard title="MSE" value="0.0021" />
      <StatCard title="Entropy" value="7.99" />
    </div>
  );
}
