interface CellProps {
  value: string | null;
  onClick: () => void;
  disabled: boolean;
}

export default function Cell(props: CellProps) {
  const baseClasses = "w-24 h-24 flex items-center justify-center text-5xl font-bold rounded-lg border-2 transition-all duration-200";
  
  const colorClasses = props.value === 'X' 
    ? 'text-blue-600 bg-blue-50 border-blue-300' 
    : props.value === 'O'
    ? 'text-red-600 bg-red-50 border-red-300'
    : 'text-gray-400';
  
  const stateClasses = !props.value && !props.disabled
    ? 'bg-white hover:bg-gray-50 cursor-pointer shadow-sm hover:shadow-md'
    : 'bg-gray-100 cursor-not-allowed opacity-60';

  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      class={`${baseClasses} ${colorClasses} ${stateClasses}`}
    >
      {props.value}
    </button>
  );
}
