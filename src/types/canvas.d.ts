declare module 'canvas' {
  export class Canvas {
    constructor(width: number, height: number);
    width: number;
    height: number;
    getContext(contextId: '2d'): CanvasRenderingContext2D;
    toBuffer(): Buffer;
    toDataURL(): string;
  }

  export class Image {
    src: string | Buffer;
    onload: () => void;
    onerror: (err: Error) => void;
    width: number;
    height: number;
  }

  export interface CanvasRenderingContext2D {
    // Add essential methods you need
    clearRect(x: number, y: number, w: number, h: number): void;
    drawImage(image: Image, dx: number, dy: number): void;
    fillRect(x: number, y: number, w: number, h: number): void;
    fillText(text: string, x: number, y: number): void;
    measureText(text: string): { width: number };
    // Add other methods as needed
  }

  export function createCanvas(width: number, height: number): Canvas;
  export function loadImage(src: string | Buffer): Promise<Image>;
}
