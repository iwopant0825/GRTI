import html2canvas from 'html2canvas';

export async function captureElementAsPng(element: HTMLElement): Promise<string> {
  const canvas = await html2canvas(element, {
    backgroundColor: null,
    scale: window.devicePixelRatio || 2,
    useCORS: true
  });
  return canvas.toDataURL('image/png');
}


