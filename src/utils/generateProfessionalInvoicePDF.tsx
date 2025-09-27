import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const generateInvoicePDF = (orderData: any) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Gradient header (Dark Green Gradient)
  const ctx = doc.context2d;
  const gradient = ctx.createLinearGradient(0, 0, pageWidth, 0);
  gradient.addColorStop(0, "#0b3d0b"); // Dark Green
  gradient.addColorStop(1, "#1abc9c"); // Light Green
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, pageWidth, 30);

  // Header text (White over gradient)
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("Kayaa", pageWidth / 2, 18, { align: "center" });
  doc.setFontSize(14);
  doc.text("Invoice", pageWidth / 2, 26, { align: "center" });

  // Customer info
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);

  const orderTime = new Date(orderData.orderTime || Date.now()).toLocaleString();
  const deliveryCharge = orderData.customerCity?.toLowerCase() === "dhaka" ? 80 : 120;

  let cursorY = 40;
  const lineGap = 7;

  doc.setFont("helvetica", "bold");
  doc.text("Invoice Details:", 20, cursorY);
  doc.setFont("helvetica", "normal");
  doc.text(`Invoice No: ${orderData.invoiceNumber || "N/A"}`, 20, cursorY + lineGap);
  doc.text(`Date/Time: ${orderTime}`, 150, cursorY + lineGap, { align: "right" });

  cursorY += lineGap * 2;
  doc.setFont("helvetica", "bold");
  doc.text("Customer Information:", 20, cursorY);
  doc.setFont("helvetica", "normal");
  cursorY += lineGap;
  doc.text(`Name: ${orderData.customerName || "-"}`, 20, cursorY);
  cursorY += lineGap;
  doc.text(`Phone: ${orderData.customerPhone || "-"}`, 20, cursorY);
  cursorY += lineGap;
  doc.text(`Email: ${orderData.customerEmail || "-"}`, 20, cursorY);
  cursorY += lineGap;
  const addressLines = doc.splitTextToSize(`Address: ${orderData.customerAddress || "-"}`, pageWidth - 40);
  doc.text(addressLines, 20, cursorY);
  cursorY += addressLines.length * lineGap;
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
      item.quantity || 0,
      (item.totalPrice ?? 0).toFixed(2),
    ]);
  });

  autoTable(doc, {
    startY: cursorY + 10,
    head: [tableColumn],
    body: tableRows,
    theme: "grid",
    headStyles: {
      fillColor: [0, 77, 0], // Dark Green Header
      textColor: 255,
      fontStyle: "bold",
      halign: "center",
    },
    bodyStyles: {
      fontSize: 11,
      cellPadding: 4,
      halign: "center",
    },
    alternateRowStyles: { fillColor: [245, 245, 245] },
  });

  const finalY = (doc as any).lastAutoTable?.finalY || cursorY + 10;
  const itemsTotal = orderData.orderItems?.reduce(
    (sum: number, item: any) => sum + (item.totalPrice ?? 0),
    0
  ) ?? 0;
  const grandTotal = itemsTotal + deliveryCharge;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(`Delivery Charge: ${deliveryCharge} TK`, 140, finalY + 10);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`Total Amount: ${grandTotal.toFixed(2)} TK`, 140, finalY + 20);

  // Outlet & Contact Info with outline
  const infoStartY = finalY + 35;
  const infoHeight = 60;
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.rect(15, infoStartY - 5, pageWidth - 30, infoHeight, "S"); // outline

  const outlets = [
    "Outlet 1: Bailey Road 143/2, AQP Shopping Mall, 3rd Floor (Opposite Fakhruddin Biriyani), New Bailey Road, Dhaka",
    "Outlet 2: PLAZA AR, 3rd Floor, Shop 303, Dhanmondi 28, Dhaka",
    "WhatsApp Order: +8801748399860", // updated phone number
    "Facebook Page: https://www.facebook.com/Strikebdofficial",
    "Website: https://www.strikeoffcial.site",
  ];

  let infoY = infoStartY;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Outlet & Contact Info:", 20, infoY);
  infoY += lineGap + 2;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  outlets.forEach((line) => {
    const splitLines = doc.splitTextToSize(line, pageWidth - 40);
    doc.text(splitLines, 20, infoY);
    infoY += splitLines.length * lineGap;
  });

  // Footer
  const footerY = infoY + 10;
  doc.setFontSize(12);
  doc.setFont("helvetica", "italic");
  doc.text("Thank you for your order!", pageWidth / 2, footerY, { align: "center" });

  // Save PDF
  const invoiceNumber = orderData.invoiceNumber || Date.now().toString();
  doc.save(`Invoice_${invoiceNumber}.pdf`);
};

export default generateInvoicePDF;
