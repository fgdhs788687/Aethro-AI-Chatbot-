from flask import Flask, request, jsonify, render_template, Response, stream_with_context
from database import init_db, save_message, get_all_messages
from dotenv import load_dotenv
import requests
import os
import json

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
init_db()  # Initialize the database when the app starts

# Load the OpenRouter API key from environment variables
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY")

# Check if the API key is loaded correctly
if not OPENROUTER_API_KEY:
    raise ValueError("OPENROUTER_API_KEY is not set in the environment variables.")

# Define routes for the Flask app
@app.route("/")
def home():
    return render_template("index.html")

# Define a route to handle chat messages
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    save_message("user", user_message)  # Save the user's message to the database
    history = get_all_messages()  # Retrieve the entire chat history
    resent_history = history[-10:] # Get the last 10 messages for context to send to the API

    # This varaible is used to send the chat history to the API, but we only want to send the last few messages for context. We can adjust how many messages we want to send.
    messages_for_api = [
        {"role": "system", "content": "You are Aethro, a helpful AI assistant. Reply in clear conversational text."}
    ] + resent_history

    def generate():
        full_reply = ""

        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={"Authorization": f"Bearer {OPENROUTER_API_KEY}"},
            json={
                "model": "openai/gpt-oss-120b",
                "messages": messages_for_api,
                "stream": True
            },
            stream=True
        )

        for line in response.iter_lines():
            if line:
                line = line.decode("utf-8")
                if line.startswith("data: "):
                    line = line[6:]
                if line == "[DONE]":
                    break
                try:
                    chunk = json.loads(line)
                    delta = chunk["choices"][0]["delta"].get("content", "")
                    if delta:
                        full_reply += delta
                        yield f"data: {json.dumps({'token': delta})}\n\n"
                except:
                    continue

        save_message("assistant", full_reply)

    return Response(stream_with_context(generate()), mimetype="text/event-stream")

if __name__ == "__main__":
    app.run(debug=True, port=5000)