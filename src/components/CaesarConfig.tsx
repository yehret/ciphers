interface Props {
  caesarShift: number;
  setCaesarShift: (shift: number) => void;
}

export default function CaesarConfig({ caesarShift, setCaesarShift }: Props) {
  return (
    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
      <label className="block text-sm font-medium text-indigo-900 mb-2">
        Przesunięcie (Klucz b): <span className="font-bold text-lg">{caesarShift}</span>
      </label>
      <div className="flex items-center space-x-4">
        <input
          type="range"
          min="1"
          max="25"
          className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
          value={caesarShift}
          onChange={(e) => setCaesarShift(parseInt(e.target.value))}
        />
        <input
          type="number"
          min="1"
          max="25"
          className="w-20 p-2 bg-white text-center text-gray-900 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          value={caesarShift}
          onChange={(e) => setCaesarShift(parseInt(e.target.value) || 0)}
        />
      </div>
    </div>
  );
}
