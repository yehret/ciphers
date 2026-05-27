import { useMemo } from 'react';

interface Props {
  vigenereKey: string;
  setVigenereKey: (key: string) => void;
}

export default function VigenereConfig({ vigenereKey, setVigenereKey }: Props) {
  const keyStrength = useMemo(() => {
    const length = vigenereKey.replace(/[^a-zA-Z]/g, '').length;
    if (length === 0) return { label: 'Brak', color: 'text-gray-500' };
    if (length < 5) return { label: 'Słaby', color: 'text-red-500' };
    if (length < 9) return { label: 'Średni', color: 'text-yellow-500' };
    return { label: 'Silny', color: 'text-green-500' };
  }, [vigenereKey]);

  const generateRandomKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let newKey = '';
    for (let i = 0; i < 8; i++) {
      newKey += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setVigenereKey(newKey);
  };

  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
      <label className="block text-sm font-medium text-blue-900 mb-2"></label>
      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-1 p-3 bg-white text-gray-900 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={vigenereKey}
          onChange={(e) => setVigenereKey(e.target.value)}
          placeholder="Wpisz tajny klucz..."
        />
        <button
          onClick={generateRandomKey}
          className="px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded-md text-sm font-medium hover:bg-gray-50 transition">
          Generuj klucz
        </button>
      </div>
      <p className="mt-2 text-sm text-blue-800">
        Siła klucza:{' '}
        <span className={`font-semibold ${keyStrength.color}`}>{keyStrength.label}</span>
      </p>
    </div>
  );
}
