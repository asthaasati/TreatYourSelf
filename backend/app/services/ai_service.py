import logging
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_groq import ChatGroq
from app.core.config import settings

# Configure logging to track when fallbacks happen
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ClinicalAIEngine:
    def __init__(self):
        # Initialize Gemini 1.5 Pro (Primary)
        # Gemini excels at long context like patient histories
        self.primary_llm = ChatGoogleGenerativeAI(
            model=settings.PRIMARY_MODEL,
            google_api_key=settings.GEMINI_API_KEY,
            temperature=0.1,
            max_output_tokens=2048,
        )
        
        # Initialize Groq (Fallback)
        # Groq is used for near-instant inference if Gemini is slow/unavailable
        self.fallback_llm = ChatGroq(
            model=settings.FALLBACK_MODEL,
            groq_api_key=settings.GROQ_API_KEY,
            temperature=0.1
        )

    async def generate_soap_draft(self, transcript: str):
        """
        Generates a professional SOAP note. 
        Tries Gemini first, falls back to Groq on failure.
        """
        prompt = (
            "System: You are a professional medical scribe. "
            "Convert the following doctor-patient consultation transcript into a "
            "structured SOAP (Subjective, Objective, Assessment, Plan) note. "
            "Maintain clinical terminology and be concise.\n\n"
            f"Transcript: {transcript}"
        )
        
        try:
            # Attempt Primary Inference (Gemini)
            response = await self.primary_llm.ainvoke(prompt)
            return response.content
        except Exception as e:
            logger.warning(f"Primary AI (Gemini) failed: {e}. Falling back to Groq.")
            try:
                # Attempt Fallback Inference (Groq)
                response = await self.fallback_llm.ainvoke(prompt)
                return response.content
            except Exception as fallback_error:
                logger.error(f"Fallback AI (Groq) also failed: {fallback_error}")
                return "Error: AI services are currently unavailable. Please draft notes manually."

    async def analyze_clinical_risks(self, text: str):
        """
        Specifically uses Groq for high-speed 'Neural Sidebar' risk detection.
        """
        prompt = f"Identify any potential clinical risks or drug interactions in this text: {text}"
        # We can use Groq directly here for speed (millisecond response times)
        response = await self.fallback_llm.ainvoke(prompt)
        return response.content