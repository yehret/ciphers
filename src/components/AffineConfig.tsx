interface Props {
  affineA: number;
  setAffineA: (a: number) => void;
  affineB: number;
  setAffineB: (b: number) => void;
}

export default function AffineConfig({ affineA, setAffineA, affineB, setAffineB }: Props) {
  const validAMultiplicators = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];

  return (
    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
      <div className="flex-1">
        <label className="block text-sm font-medium text-purple-900 mb-2">Mnożnik (Klucz a)</label>
        <select
          className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          value={affineA}
          onChange={(e) => setAffineA(parseInt(e.target.value))}>
          {validAMultiplicators.map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-purple-700">Musi być względnie pierwsze z 26.</p>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-purple-900 mb-2">
          Przesunięcie (Klucz b)
        </label>
        <input
          type="number"
          min="0"
          max="25"
          className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          value={affineB}
          onChange={(e) => setAffineB(parseInt(e.target.value) || 0)}
        />
        <p className="mt-1 text-xs text-purple-700">Wartość od 0 do 25.</p>
      </div>
    </div>
  );
}
