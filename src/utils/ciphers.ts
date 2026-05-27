export type CipherMode = 'encrypt' | 'decrypt';

export function processVigenere(text: string, key: string, mode: CipherMode): string {
  let result = '';
  let keyIndex = 0;
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '');

  if (!cleanKey) return text;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (/[a-zA-Z]/.test(char)) {
      const isUpperCase = char === char.toUpperCase();
      const offset = isUpperCase ? 65 : 97;
      const charCode = text.charCodeAt(i) - offset;
      const shift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;

      let newCharCode;
      if (mode === 'encrypt') {
        newCharCode = (charCode + shift) % 26;
      } else {
        newCharCode = (charCode - shift + 26) % 26;
      }

      result += String.fromCharCode(newCharCode + offset);
      keyIndex++;
    } else {
      result += char;
    }
  }
  return result;
}

export function processCaesar(text: string, shift: number, mode: CipherMode): string {
  let result = '';
  const actualShift = Math.abs(shift) % 26;

  if (actualShift === 0) return text;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (/[a-zA-Z]/.test(char)) {
      const isUpperCase = char === char.toUpperCase();
      const offset = isUpperCase ? 65 : 97;
      const charCode = text.charCodeAt(i) - offset;

      let newCharCode;
      if (mode === 'encrypt') {
        newCharCode = (charCode + actualShift) % 26;
      } else {
        newCharCode = (charCode - actualShift + 26) % 26;
      }

      result += String.fromCharCode(newCharCode + offset);
    } else {
      result += char;
    }
  }
  return result;
}

function modInverse(a: number, m: number): number {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  return 1;
}

export function processAffine(text: string, a: number, b: number, mode: CipherMode): string {
  let result = '';
  const m = 26;

  a = ((a % m) + m) % m;
  b = ((b % m) + m) % m;

  let aInverse = 0;
  if (mode === 'decrypt') {
    aInverse = modInverse(a, m);
  }

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (/[a-zA-Z]/.test(char)) {
      const isUpperCase = char === char.toUpperCase();
      const offset = isUpperCase ? 65 : 97;
      const x = text.charCodeAt(i) - offset;

      let newCharCode;
      if (mode === 'encrypt') {
        newCharCode = (a * x + b) % m;
      } else {
        newCharCode = (aInverse * (x - b + m)) % m;
      }

      result += String.fromCharCode(newCharCode + offset);
    } else {
      result += char;
    }
  }
  return result;
}

export function processPlayfair(text: string, key: string, mode: CipherMode): string {
  const cleanKey = key
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .replace(/J/g, 'I');
  const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
  let matrix = '';

  for (const char of cleanKey + alphabet) {
    if (!matrix.includes(char)) {
      matrix += char;
    }
  }

  let cleanText = text
    .toUpperCase()
    .replace(/[^A-Z]/g, '')
    .replace(/J/g, 'I');
  if (!cleanText) return text;

  if (mode === 'encrypt') {
    let prepared = '';
    for (let i = 0; i < cleanText.length; i++) {
      prepared += cleanText[i];
      if (
        i + 1 < cleanText.length &&
        cleanText[i] === cleanText[i + 1] &&
        prepared.length % 2 !== 0
      ) {
        prepared += cleanText[i] === 'X' ? 'Q' : 'X';
      }
    }
    if (prepared.length % 2 !== 0) prepared += 'X';
    cleanText = prepared;
  }

  let result = '';
  for (let i = 0; i < cleanText.length; i += 2) {
    const char1 = cleanText[i];
    const char2 = cleanText[i + 1];
    if (!char2) break;

    const idx1 = matrix.indexOf(char1);
    const idx2 = matrix.indexOf(char2);

    const row1 = Math.floor(idx1 / 5);
    const col1 = idx1 % 5;
    const row2 = Math.floor(idx2 / 5);
    const col2 = idx2 % 5;

    let resRow1, resCol1, resRow2, resCol2;

    if (row1 === row2) {
      const shift = mode === 'encrypt' ? 1 : 4;
      resRow1 = row1;
      resCol1 = (col1 + shift) % 5;
      resRow2 = row2;
      resCol2 = (col2 + shift) % 5;
    } else if (col1 === col2) {
      const shift = mode === 'encrypt' ? 1 : 4;
      resRow1 = (row1 + shift) % 5;
      resCol1 = col1;
      resRow2 = (row2 + shift) % 5;
      resCol2 = col2;
    } else {
      resRow1 = row1;
      resCol1 = col2;
      resRow2 = row2;
      resCol2 = col1;
    }

    result += matrix[resRow1 * 5 + resCol1] + matrix[resRow2 * 5 + resCol2];
  }

  if (mode === 'decrypt') {
    let finalResult = result.replace(/(.)X(?=\1)/g, '$1');

    if (finalResult.endsWith('X')) {
      finalResult = finalResult.slice(0, -1);
    }

    return finalResult;
  } else {
    return result.match(/.{1,5}/g)?.join(' ') || result;
  }
}
