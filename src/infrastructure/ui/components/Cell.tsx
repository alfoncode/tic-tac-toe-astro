interface CellProps {
  value: string | null;
  onClick: () => void;
  disabled: boolean;
}

export default function Cell(props: CellProps) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      class={`w-20 h-20 flex items-center justify-center text-4xl font-bold rounded-md transition-colors
        ${props.value === 'X' ? 'text-blue-600' : 'text-red-600'}
        ${!props.value && !props.disabled ? 'bg-white hover:bg-gray-100 cursor-pointer' : 'bg-gray-100 cursor-not-allowed'}
        border-2 border-gray-300
      `}
    >
      {props.value}
    </button>
  );
}
