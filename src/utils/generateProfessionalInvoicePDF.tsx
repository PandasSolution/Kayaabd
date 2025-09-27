import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const generateInvoicePDF = (orderData: any) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Gradient header (Dark to Leaf Green)
  const ctx = doc.context2d;
  const gradient = ctx.createLinearGradient(0, 0, pageWidth, 0);
  gradient.addColorStop(0, "#0b3d0b"); // Dark deep green
  gradient.addColorStop(1, "#228B22"); // Leaf green
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, pageWidth, 35);

  // Header text
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("Kayaa", pageWidth / 2, 20, { align: "center" });
  doc.setFontSize(14);
  doc.text("Invoice", pageWidth / 2, 30, { align: "center" });

  // Customer info
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);

  const orderTime = new Date(orderData.orderTime || Date.now()).toLocaleString();
  const deliveryCharge = orderData.customerCity?.toLowerCase() === "dhaka" ? 80 : 120;

  let cursorY = 45;
  const lineGap = 7;

  doc.setFont("helvetica", "bold");
  doc.setTextColor(34, 139, 34); // Leaf green heading
  doc.text("Invoice Details:", 20, cursorY);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);
  doc.text(`Invoice No: ${orderData.invoiceNumber || "N/A"}`, 20, cursorY + lineGap);
  doc.text(`Date/Time: ${orderTime}`, 150, cursorY + lineGap, { align: "right" });

  cursorY += lineGap * 2;
  doc.setFont("helvetica", "bold");
  doc.setTextColor(34, 139, 34);
  doc.text("Customer Information:", 20, cursorY);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0, 0, 0);

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
      item.quantity !== undefined ? item.quantity : "-", // Fix quantity
      (item.totalPrice ?? 0).toFixed(2),
    ]);
  });

  autoTable(doc, {
    startY: cursorY + 10,
    head: [tableColumn],
    body: tableRows,
    theme: "grid",
    headStyles: {
      fillColor: [34, 139, 34], // Leaf green
      textColor: 255,
      fontStyle: "bold",
      halign: "center",
    },
    bodyStyles: {
      fontSize: 11,
      cellPadding: 4,
      halign: "center",
    },
    alternateRowStyles: { fillColor: [235, 250, 235] }, // light green rows
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

  // Total Amount Box
  doc.setFillColor(34, 139, 34); // green box
  doc.rect(120, finalY + 18, 70, 12, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`Total: ${grandTotal.toFixed(2)} TK`, 155, finalY + 26, { align: "center" });

  // Contact Info
  const infoStartY = finalY + 45;
  const lineGapInfo = 7;

  const contacts = [
    "Mobile: 01748399860",
    "Facebook Page: https://www.facebook.com/kayaabd21",
    "Website: https://kayaa-bd-core-xjwz.vercel.app/",
  ];

  let infoY = infoStartY;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(34, 139, 34);
  doc.text("Contact Info:", 20, infoY);
  infoY += lineGapInfo + 2;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  contacts.forEach((line) => {
    const splitLines = doc.splitTextToSize(line, pageWidth - 40);
    doc.text(splitLines, 20, infoY);
    infoY += splitLines.length * lineGapInfo;
  });

  // Footer
  const footerY = infoY + 10;
  doc.setFontSize(12);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(34, 139, 34); // green italic footer
  doc.text("Thank you for your order!", pageWidth / 2, footerY, { align: "center" });

  // Save PDF
  const invoiceNumber = orderData.invoiceNumber || Date.now().toString();
  doc.save(`Invoice_${invoiceNumber}.pdf`);
};

export default generateInvoicePDF;
