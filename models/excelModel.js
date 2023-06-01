const XLSX = require('xlsx');

class ExcelModel {
  constructor(filePath) {
    this.filePath = filePath;
    this.workbook = null;
  }

  loadFile() {
    this.workbook = XLSX.readFile(this.filePath);
  }

  saveFile(outputPath) {
    XLSX.writeFile(this.workbook, outputPath);
  }

  extractData(sheetName) {
    const worksheet = this.workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    return data;
  }

  performCalculation(data) {
    
    
    const result = {
        ...row,
        Sum: row.Number1 + row.Number2,                 // Addition: Sum = Number1 + Number2
        Difference: row.Number1 - row.Number2           // Subtraction: Difference = Number1 - Number2
      };
      return result;

    return processedData;

  }

  updateCellValue(sheetName, cell, value) {
    const worksheet = this.workbook.Sheets[sheetName];
    worksheet[cell].v = value;
  }
}

module.exports = ExcelModel;
