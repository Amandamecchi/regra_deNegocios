const PDFDocument = require('pdfkit');

const ingressoModel = require('../models/ingressoModel');

const ingressoPDF = async (req, res) => {   
    try {
      const ingresso = await ingressoModel.getIngressoById(req.params.id);  
      console.log(ingresso);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "inline; filename=ingresso.pdf");
      
      const doc = new PDFDocument();
      doc.pipe(res);

      // Título do PDF
      doc.fillColor("black").fontSize(16).text("Relatório dos Ingressos", { align: "center" });
      doc.moveDown();

      // Cabeçalhos da tabela
      doc.fontSize(12).text ("ID | evento | data_evento ", {underline: true});
      doc.moveDown(0.5);

      // Adiciona os dados dos ingressos
      ingresso.forEach((ingresso) => {
          doc.text(
              `${ingresso.id} | ${ingresso.evento} | ${ingresso.localizacao} | R$${parseFloat(ingresso.preco).toFixed(2)}`
          );
      });

      doc.end();
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { exportPDF };