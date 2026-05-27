'use client';

import { useState } from 'react';
import {
  CipherMode,
  processAffine,
  processCaesar,
  processPlayfair,
  processVigenere,
} from '../utils/ciphers';

import CaesarConfig from '@/components/CaesarConfig';
import AffineConfig from '../components/AffineConfig';
import PlayfairConfig from '../components/PlayfairConfig';
import VigenereConfig from '../components/VigenereConfig';

type CipherType = 'vigenere' | 'caesar' | 'affine' | 'playfair';

export default function CipherApp() {
  const [activeTab, setActiveTab] = useState<CipherType>('vigenere');
  const [mode, setMode] = useState<CipherMode>('encrypt');
  const [text, setText] = useState('');
  const [resultText, setResultText] = useState('');

  const [vigenereKey, setVigenereKey] = useState('');
  const [caesarShift, setCaesarShift] = useState(3);
  const [affineA, setAffineA] = useState(5);
  const [affineB, setAffineB] = useState(8);
  const [playfairKey, setPlayfairKey] = useState('');

  const configComponents = {
    vigenere: <VigenereConfig vigenereKey={vigenereKey} setVigenereKey={setVigenereKey} />,
    caesar: <CaesarConfig caesarShift={caesarShift} setCaesarShift={setCaesarShift} />,
    affine: (
      <AffineConfig
        affineA={affineA}
        setAffineA={setAffineA}
        affineB={affineB}
        setAffineB={setAffineB}
      />
    ),
    playfair: <PlayfairConfig playfairKey={playfairKey} setPlayfairKey={setPlayfairKey} />,
  };

  const handleProcess = () => {
    const processors = {
      vigenere: () => processVigenere(text, vigenereKey, mode),
      caesar: () => processCaesar(text, caesarShift, mode),
      affine: () => processAffine(text, affineA, affineB, mode),
      playfair: () => processPlayfair(text, playfairKey, mode),
    };

    const result = processors[activeTab] ? processors[activeTab]() : '';

    setResultText(result);
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
          <button
            onClick={() => {
              setActiveTab('vigenere');
              setResultText('');
            }}
            className={`flex-1 min-w-30 py-4 text-center font-medium text-sm sm:text-base border-b-2 transition-colors ${
              activeTab === 'vigenere'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}>
            Szyfr Vigenère&apos;a
          </button>
          <button
            onClick={() => {
              setActiveTab('caesar');
              setResultText('');
            }}
            className={`flex-1 min-w-30 py-4 text-center font-medium text-sm sm:text-base border-b-2 transition-colors ${
              activeTab === 'caesar'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}>
            Szyfr Cezara
          </button>
          <button
            onClick={() => {
              setActiveTab('affine');
              setResultText('');
            }}
            className={`flex-1 min-w-30 py-4 text-center font-medium text-sm sm:text-base border-b-2 transition-colors ${
              activeTab === 'affine'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}>
            Szyfr Afiniczny
          </button>
          <button
            onClick={() => {
              setActiveTab('playfair');
              setResultText('');
            }}
            className={`flex-1 min-w-30 py-4 text-center font-medium text-sm sm:text-base border-b-2 transition-colors ${
              activeTab === 'playfair'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}>
            Szyfr Playfaira
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                setMode('encrypt');
                setResultText('');
              }}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                mode === 'encrypt'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}>
              Tryb: Szyfrowanie
            </button>
            <button
              onClick={() => {
                setMode('decrypt');
                setResultText('');
              }}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                mode === 'decrypt'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}>
              Tryb: Deszyfrowanie
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tekst wejściowy</label>
            <textarea
              className="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-md focus:ring-gray-500 focus:border-gray-500"
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Wpisz tekst tutaj..."
            />
          </div>

          <div className="my-6">{configComponents[activeTab]}</div>

          {activeTab === 'playfair' && (
            <PlayfairConfig playfairKey={playfairKey} setPlayfairKey={setPlayfairKey} />
          )}

          <div className="flex justify-center pt-4">
            <button
              onClick={handleProcess}
              className="px-8 py-3 bg-green-600 text-white text-lg font-bold rounded-lg hover:bg-green-700 transition shadow-lg">
              {mode === 'encrypt' ? 'Zaszyfruj tekst' : 'Odszyfruj tekst'}
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Wynik</label>
            <textarea
              readOnly
              className="w-full p-3 bg-gray-100 text-gray-900 border border-gray-300 rounded-md font-mono"
              rows={4}
              value={resultText}
              placeholder="Tutaj pojawi się wynik..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
