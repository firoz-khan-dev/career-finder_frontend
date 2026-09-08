export default function ProgressBar({ step }) {
  return (
    <div className="mb-4">
      <p>Step {step + 1} / 4</p>
      <div className="bg-gray-200 h-2">
        <div
          className="bg-blue-600 h-2"
          style={{ width: `${(step + 1) * 25}%` }}
        />
      </div>
    </div>
  );
}