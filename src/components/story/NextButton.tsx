interface NextButtonProps {
  onClick: () => void;
}

export default function NextButton({ onClick }: NextButtonProps) {
  return (
    <button onClick={onClick} className="mt-4 rounded bg-green-600 px-4 py-2">
      Lanjut
    </button>
  );
}
