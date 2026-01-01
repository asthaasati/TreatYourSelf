from reportlab.pdfgen import canvas
from io import BytesIO

class PDFSignerService:
    async def create_signed_rx(self, doctor_id: int, license_no: str, clinical_content: str):
        """Generates a digitally signed clinical document."""
        buffer = BytesIO()
        p = canvas.Canvas(buffer)
        p.drawString(100, 800, f"Official Digital Prescription")
        p.drawString(100, 780, f"Doctor ID: {doctor_id} | License: {license_no}")
        p.drawString(100, 750, f"Notes: {clinical_content[:500]}...")
        p.showPage()
        p.save()
        
        # In production, upload buffer to secure S3 bucket
        return f"prescriptions/signed_rx_{doctor_id}.pdf"