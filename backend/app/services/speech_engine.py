import openai
from app.core.config import settings

class ClinicalSpeechEngine:
    def __init__(self):
        self.client = openai.AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

    async def transcribe_consultation(self, audio_file_path: str):
        """Converts raw audio into clinical transcript using Whisper."""
        with open(audio_file_path, "rb") as audio:
            transcript = await self.client.audio.transcriptions.create(
                model="whisper-1", 
                file=audio,
                response_format="text"
            )
        return transcript

    async def generate_draft_soap(self, transcript: str, patient_history: str):
        """Generates editable SOAP draft from transcript and clinical memory."""
        prompt = f"""
        TRANSCRIPT: {transcript}
        PATIENT_HISTORY: {patient_history}
        
        Generate a professional SOAP note. 
        Focus on NEW symptoms and changes to the Plan.
        Identify any Risk Flags.
        """
        # Call LLM logic here
        return {"soap_note": "Draft text...", "confidence": 0.94}