import requests
import os
from dotenv import load_dotenv

# Load variables from .env into the environment
load_dotenv()

# Get the key using the exact name in your .env
api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    print("❌ Error: GROQ_API_KEY not found in .env file.")
else:
    url = "https://api.groq.com/openai/v1/models"

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status() # Check for HTTP errors
        
        models = response.json()
        print("✅ Connection Successful! Available Groq Models:")
        for model in models.get('data', []):
            print(f"- {model['id']}")
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Connection Failed: {e}")