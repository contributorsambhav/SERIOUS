const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

async function mergePDFs(inputFile1, inputFile2, outputFile) {
    const pdfDoc = await PDFDocument.create();

    const file1 = await fs.promises.readFile(inputFile1);
    const file2 = await fs.promises.readFile(inputFile2);

    const pdf1 = await PDFDocument.load(file1);
    const pdf2 = await PDFDocument.load(file2);

    const copiedPages1 = await pdfDoc.copyPages(pdf1, pdf1.getPageIndices());
    copiedPages1.forEach(page => pdfDoc.addPage(page));

    const copiedPages2 = await pdfDoc.copyPages(pdf2, pdf2.getPageIndices());
    copiedPages2.forEach(page => pdfDoc.addPage(page));

    const mergedPdfBytes = await pdfDoc.save();

    await fs.promises.writeFile(outputFile, mergedPdfBytes);

    console.log('PDF files merged successfully.');
}

const inputFile1 = 'input1.pdf'; // Replace with your first input PDF file
const inputFile2 = 'input2.pdf'; // Replace with your second input PDF file
const outputFile = 'merged.pdf'; // Replace with the desired output PDF file name

mergePDFs(inputFile1, inputFile2, outputFile);
