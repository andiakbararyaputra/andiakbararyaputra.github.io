import { useMemo } from 'react';

interface QrMatrixSvgProps {
  size?: number;
  label?: string;
}

// Verified Version 3-M QR matrix encoding: https://github.com/andiakbararyaputra
const GITHUB_QR_MATRIX: readonly string[] = [
  '11111110000100110111001111111',
  '10000010101001010101001000001',
  '10111010011000011000001011101',
  '10111010011111011011001011101',
  '10111010101101110011001011101',
  '10000010011000110101001000001',
  '11111110101010101010101111111',
  '00000000000010011110100000000',
  '10101010000110000101100010010',
  '00011101000111001000101001001',
  '00010010101100100110011010111',
  '01001100001001111111000110010',
  '01001010101110100100111001011',
  '11010001100000101100111001001',
  '11010011101101001110001011011',
  '10011001111100010100111001010',
  '01001010010100000101101101011',
  '00101000111011001100011001101',
  '10100011010010100010010110011',
  '01010001000011110111111111010',
  '10000111010000101101111110000',
  '00000000111100101111100010111',
  '11111110000001000111101011011',
  '10000010010000010100100011000',
  '10111010111000010100111110011',
  '10111010011110001100100110111',
  '10111010101000101011000111001',
  '10000010011101000111110010010',
  '11111110101010100101110110011',
];

const QUIET_ZONE = 4;
const MATRIX_DIM = GITHUB_QR_MATRIX.length;
const VIEW_DIM = MATRIX_DIM + QUIET_ZONE * 2;

export function QrMatrixSvg({
  size = 112,
  label = 'QR Code for https://github.com/andiakbararyaputra',
}: QrMatrixSvgProps) {
  const pathData = useMemo(() => {
    const parts: string[] = [];
    for (let r = 0; r < MATRIX_DIM; r++) {
      const row = GITHUB_QR_MATRIX[r];
      for (let c = 0; c < MATRIX_DIM; c++) {
        if (row[c] === '1') {
          parts.push(`M${c + QUIET_ZONE},${r + QUIET_ZONE}h1v1h-1z`);
        }
      }
    }
    return parts.join('');
  }, []);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${VIEW_DIM} ${VIEW_DIM}`}
      role="img"
      aria-label={label}
      shapeRendering="crispEdges"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <rect x="0" y="0" width={VIEW_DIM} height={VIEW_DIM} fill="#f4f6fa" />
      <path d={pathData} fill="#06070a" />
    </svg>
  );
}
