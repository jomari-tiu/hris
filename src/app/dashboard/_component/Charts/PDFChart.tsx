import { jsPDF } from "jspdf";

export const generatePdf = (chartImage: string | undefined) => {
  const pdf = new jsPDF();

  const logo = new Image();
  logo.src = 'images/logo/logo.png'; 

  logo.onload = () => {
    pdf.addImage(logo, 'PNG', 15, 10, 30, 30); 
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18); 
    pdf.text('ILOCOS SUR POLYTECHNIC STATE COLLEGE', 52, 23); 
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(15); 
    pdf.text('Santa Maria, Ilocos Sur', 85, 30); 

    if (chartImage) {
      const img = new Image();
      img.src = chartImage;

      img.onload = () => {
        const aspectRatio = img.width / img.height;

        const maxWidth = 180; 
        const maxHeight = 160; 

        let imageWidth = maxWidth;
        let imageHeight = maxWidth / aspectRatio;

        if (imageHeight > maxHeight) {
          imageHeight = maxHeight;
          imageWidth = maxHeight * aspectRatio;
        }

        const chartYPosition = 60; 
        pdf.addImage(chartImage, 'PNG', 10, chartYPosition, imageWidth, imageHeight); 

        const footerYPosition = chartYPosition + imageHeight + 20; 
        pdf.setFontSize(13);
        pdf.text('Approved by:', 10, footerYPosition);
        pdf.text('Michael Anthony A. Guarin', 10, footerYPosition + 15); 
        pdf.text('Head, Human Resource Development Services', 10, footerYPosition + 22);

        // pdf.text('Approved by:', 10, pdf.internal.pageSize.height - 40);
        // pdf.text('Michael Anthony A. Guarin', 10, pdf.internal.pageSize.height - 30);
        // pdf.text('Head, Human Resource Development Services', 10, pdf.internal.pageSize.height - 20);

        pdf.save('chart.pdf');
      };

      img.onerror = (error) => {
        console.error('Error loading chart image:', error);
      };
    }
  };

  logo.onerror = (error) => {
    console.error('Error loading logo:', error);
  };
};
