import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const generateInvoicePDF = (orderData: any) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Gradient header (Dark to Leaf Green)
  const ctx = doc.context2d;
  const gradient = ctx.createLinearGradient(0, 0, pageWidth, 0);
  gradient.addColorStop(0, "#0b3d0b");
  gradient.addColorStop(1, "#228B22");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, pageWidth, 35);

  // Header text
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("Kayaa", pageWidth / 2, 20, { align: "center" });
  doc.setFontSize(14);
  doc.text("Invoice", pageWidth / 2, 30, { align: "center" });

  const orderTime = new Date(orderData.orderTime || Date.now()).toLocaleString();
  const deliveryCharge = orderData.customerCity?.toLowerCase() === "dhaka" ? 80 : 120;

  let cursorY = 45;
  const lineGap = 7;

  // Section Box Helper (with shadow)
  const drawBox = (y: number, title: string) => {
    doc.setFillColor(245, 255, 245);
    doc.setDrawColor(34, 139, 34);
    doc.setLineWidth(0.5);
    doc.roundedRect(15, y - 8, pageWidth - 30, 10, 2, 2, "FD");
    doc.setFont("helvetica", "bold");
    doc.setTextColor(34, 139, 34);
    doc.text(title, 20, y);
  };

  // Invoice Details
  drawBox(cursorY, "Invoice Details");
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  doc.text(`Invoice No: ${orderData.invoiceNumber || "N/A"}`, 20, cursorY + lineGap);
  doc.text(`Date/Time: ${orderTime}`, 150, cursorY + lineGap, { align: "right" });

  cursorY += lineGap * 3;

  // Customer Information
  drawBox(cursorY, "Customer Information");
  cursorY += lineGap;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  doc.text(`Name: ${orderData.customerName || "-"}`, 20, cursorY + lineGap);
  doc.text(`Phone: ${orderData.customerPhone || "-"}`, 20, cursorY + lineGap * 2);
  doc.text(`Email: ${orderData.customerEmail || "-"}`, 20, cursorY + lineGap * 3);

  const addressLines = doc.splitTextToSize(`Address: ${orderData.customerAddress || "-"}`, pageWidth - 40);
  doc.text(addressLines, 20, cursorY + lineGap * 4);
  cursorY += lineGap * (4 + addressLines.length);

  doc.text(`City: ${orderData.customerCity || "-"}`, 20, cursorY);
  cursorY += lineGap;
  doc.text(`Postal Code: ${orderData.customerPostalCode || "-"}`, 20, cursorY);
  cursorY += lineGap;
  doc.text(`Payment Method: ${orderData.paymentMethod || "-"}`, 20, cursorY);

  // Product Table
  const tableColumn = ["#", "Product", "Size", "Qty", "Price (TK)"];
  const tableRows: any[] = [];
  orderData.orderItems?.forEach((item: any, index: number) => {
    tableRows.push([
      index + 1,
      item.name || "-",
      item.size || "-",
      item.quantity !== undefined ? item.quantity : "-",
      (item.totalPrice ?? 0).toFixed(2),
    ]);
  });

  autoTable(doc, {
    startY: cursorY + 10,
    head: [tableColumn],
    body: tableRows,
    theme: "grid",
    headStyles: {
      fillColor: [34, 139, 34],
      textColor: 255,
      fontStyle: "bold",
      halign: "center",
    },
    bodyStyles: {
      fontSize: 11,
      cellPadding: 4,
      halign: "center",
    },
    alternateRowStyles: { fillColor: [235, 250, 235] },
  });

  const finalY = (doc as any).lastAutoTable?.finalY || cursorY + 10;
  const itemsTotal = orderData.orderItems?.reduce(
    (sum: number, item: any) => sum + (item.totalPrice ?? 0),
    0
  ) ?? 0;
  const grandTotal = itemsTotal + deliveryCharge;

  // Delivery charge
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text(`Delivery Charge: ${deliveryCharge} TK`, 140, finalY + 10);

  // Premium Total Box with 3D shadow
  doc.setFillColor(34, 139, 34);
  doc.setDrawColor(0, 77, 0);
  doc.setLineWidth(0.8);
  doc.roundedRect(120, finalY + 18, 70, 14, 3, 3, "FD");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`Total: ${grandTotal.toFixed(2)} TK`, 155, finalY + 28, { align: "center" });

  // Contact Info Box
  const infoStartY = finalY + 45;
  drawBox(infoStartY, "Contact Info");

  const contacts = [
    "Mobile: 01748399860",
    "Facebook Page: https://www.facebook.com/kayaabd21",
    "Website: https://kayaa-bd-core-xjwz.vercel.app/",
  ];

  let infoY = infoStartY + lineGap;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  contacts.forEach((line) => {
    const splitLines = doc.splitTextToSize(line, pageWidth - 40);
    doc.text(splitLines, 20, infoY);
    infoY += splitLines.length * lineGap;
  });

  // Footer
  const footerY = infoY + 12;
  doc.setFontSize(12);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(34, 139, 34);
  doc.text("Thank you for your order!", pageWidth / 2, footerY, { align: "center" });

  // Save PDF
  const invoiceNumber = orderData.invoiceNumber || Date.now().toString();
  doc.save(`Invoice_${invoiceNumber}.pdf`);
};

export default generateInvoicePDF;
