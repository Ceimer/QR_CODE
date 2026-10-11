import type QRCodeStyling from "qr-code-styling";

let currentInstance: QRCodeStyling | null = null;

export function setQRInstance(instance: QRCodeStyling | null): void {
  currentInstance = instance;
}

export function getQRInstance(): QRCodeStyling | null {
  return currentInstance;
}
