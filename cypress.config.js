const { defineConfig } = require("cypress");
const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        readPdf(pathToPdf) {
          return new Promise((resolve) => {
            const resolvedPath = path.resolve(pathToPdf);
            console.log(resolvedPath)
            const pdfBuffer = fs.readFileSync(resolvedPath);
            pdf(pdfBuffer).then((pdfData) => {
              resolve(pdfData.text);
            })
          })
        }
      })
    }
  },
});
