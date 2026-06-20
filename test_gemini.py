from google import genai

client = genai.Client()
ask = input("Ask Gemini: ")
response = client.models.generate_content(
    model = "gemini-2.5-flash",
    contents = ask   
)

print(response.text)