import { getDocument, GlobalWorkerOptions, version } from 'pdfjs-dist';
import type {
    PDFDocumentProxy,
    PDFPageProxy,
    TextContent,
    TextItem,
    TextMarkedContent
} from 'pdfjs-dist/types/src/display/api';

// Initialize PDF.js worker using CDN
if (typeof window !== 'undefined') {
    GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;
}

export async function extractTextFromPDF(file: File): Promise<string> {
    let pdf: PDFDocumentProxy | null = null;

    try {
        const arrayBuffer = await file.arrayBuffer();
        pdf = await getDocument(arrayBuffer).promise;
        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page: PDFPageProxy = await pdf.getPage(i);
            const textContent: TextContent = await page.getTextContent();

            const pageText = textContent.items
                .map((item: TextItem | TextMarkedContent) => {
                    return 'str' in item ? item.str : '';
                })
                .filter(Boolean)
                .join(' ');

            fullText += pageText + '\n';

            // Clean up page resources
            page.cleanup();
        }

        return fullText.trim();
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('PDF parsing error:', errorMessage);
        throw new Error(`Failed to parse PDF: ${errorMessage}`);
    } finally {
        // Clean up PDF document
        if (pdf) {
            try {
                await pdf.destroy();
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                console.error('Error destroying PDF document:', errorMessage);
            }
        }
    }
}
