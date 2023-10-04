describe("Compare 2 PDFs", () => {
    it("Comparing the content of 2 PDFs and assert true if equal", () => {

        cy.task('readPdf', 'cypress\\fixtures\\file1.pdf').then((pdf1Content) => {
            cy.task('readPdf', 'cypress\\fixtures\\file2.pdf').then((pdf2Content) =>{
                expect(pdf1Content).to.equal(pdf2Content);
            })
        })
    })
})