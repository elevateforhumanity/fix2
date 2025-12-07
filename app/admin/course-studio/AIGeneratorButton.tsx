interface AIGeneratorButtonProps {
  label: string;
  onClick: () => void;
}

export default function AIGeneratorButton({ label, onClick }: AIGeneratorButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium"
    >
      {label}
    </button>
  );
}
