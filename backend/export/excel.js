const ExcelJS = require('exceljs');

router.get('/export/excel', protect, authorize('admin', 'super_admin'), async (req, res) => {
  const devis = await Devis.find().populate('user', 'name email');
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Devis');
  worksheet.columns = [
    { header: 'N° Devis', key: 'requestNumber', width: 15 },
    { header: 'Client', key: 'client', width: 20 },
    { header: 'Email', key: 'email', width: 25 },
    { header: 'Services', key: 'services', width: 30 },
    { header: 'Montant', key: 'amount', width: 15 },
    { header: 'Statut', key: 'status', width: 15 },
    { header: 'Date', key: 'date', width: 15 },
  ];
  devis.forEach(d => {
    worksheet.addRow({
      requestNumber: d.requestNumber,
      client: d.user?.name || 'N/A',
      email: d.user?.email || 'N/A',
      services: d.services?.join(', ') || '',
      amount: d.estimatedAmount ? `${d.estimatedAmount} €` : 'Sur devis',
      status: d.status,
      date: d.createdAt.toLocaleDateString('fr-FR'),
    });
  });
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=devis.xlsx');
  await workbook.xlsx.write(res);
  res.end();
});