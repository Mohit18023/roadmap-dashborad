import Tesseract from 'tesseract.js';

export async function extractTextFromImage(file: File): Promise<string> {
  try {
    const result = await Tesseract.recognize(
      URL.createObjectURL(file),
      'eng',
      {
        logger: m => console.log(m)
      }
    );
    return result.data.text;
  } catch (error) {
    console.error('Image OCR error:', error);
    throw new Error('Failed to extract text from image');
  }
}
