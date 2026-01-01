class SafetyRadar:
    async def detect_interactions(self, note_text: str, patient_history: list):
        """Checks for drug-drug interactions in real-time."""
        alerts = []
        if "Sildenafil" in note_text and "Nitroglycerin" in str(patient_history):
            alerts.append({
                "severity": "CRITICAL",
                "message": "Major Interaction: Sildenafil + Nitroglycerin detected."
            })
        return alerts