import { useMemo } from 'react';

interface Props {
  playfairKey: string;
  setPlayfairKey: (key: string) => void;
}

export default function PlayfairConfig({ playfairKey, setPlayfairKey }: Props) {
  const matrix = useMemo(() => {
    const cleanKey = playfairKey
      .toUpperCase()
      .replace(/[^A-Z]/g, '')
      .replace(/J/g, 'I');
    const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
    let matrixStr = '';

    for (const char of cleanKey + alphabet) {
      if (!matrixStr.includes(char)) {
        matrixStr += char;
      }
    }

    const grid = [];
    for (let i = 0; i < 25; i += 5) {
      grid.push(matrixStr.substring(i, i + 5).split(''));
    }
    return grid;
  }, [playfairKey]);

  return (
    <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0">
      <div className="flex-1">
        <label className="block text-sm font-medium text-emerald-900 mb-2">
          Słowo kluczowe (Klucz szyfru)
        </label>
        <input
          type="text"
          className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
          value={playfairKey}
          onChange={(e) => setPlayfairKey(e.target.value)}
          placeholder="Wpisz tajne słowo..."
        />
        <div className="mt-4 text-sm text-emerald-800 space-y-1">
          <p>
            <strong>Uwaga:</strong>
          </p>
          <ul className="list-disc list-inside">
            <li>Litera &quot;J&quot; jest automatycznie zamieniana na &quot;I&quot;.</li>
            <li>Spacje i znaki specjalne są usuwane z wyniku.</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <label className="block text-sm font-medium text-emerald-900 mb-2 text-center">
          Tabela szyfrująca (5x5)
        </label>
        <div className="grid grid-cols-5 gap-1 bg-emerald-200 p-2 rounded-md">
          {matrix.map((row, rIdx) =>
            row.map((char, cIdx) => (
              <div
                key={`${rIdx}-${cIdx}`}
                className="w-8 h-8 flex items-center justify-center bg-white rounded text-sm font-bold text-gray-800 shadow-sm">
                {char}
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  );
}
