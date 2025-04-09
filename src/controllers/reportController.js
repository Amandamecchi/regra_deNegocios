const PDFKit = require('pdfkit');
const ingressoModel = require('../models/ingressoModel');

const gerarRelatorioPDF = async (req, res) => {
  try {
    const ingressos = await ingressoModel.getIngressos();

    if (!ingressos || ingressos.length === 0) {
      return res.status(404).json({ message: "Nenhum ingresso encontrado." });
    }

    console.log("Ingressos carregados:", ingressos);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=relatorio_ingressos.pdf");

    const pdf = new PDFKit();
    pdf.pipe(res);

    pdf.fillColor("#000000")
       .fontSize(18)
       .text("Relatório de Ingressos", { align: "center" });
    pdf.moveDown();

    pdf.fontSize(12)
       .text("ID | Evento | Data | Local | Categoria | Preço", { underline: true });
    pdf.moveDown(0.5);

    ingressos.forEach(item => {
      pdf.text(
        `${item.id} | ${item.evento} | ${item.data_evento} | ${item.local_evento} | ${item.categoria} | R$ ${parseFloat(item.preco).toFixed(2)}`
      );
    });

    pdf.end();
  } catch (err) {
    console.error("Falha ao gerar o PDF:", err);
    res.status(500).json({ message: "Erro interno ao gerar o PDF." });
  }
};

module.exports = { gerarRelatorioPDF };
