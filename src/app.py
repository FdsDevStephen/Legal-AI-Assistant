from flask import Flask, request, jsonify
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# Initialize model and tokenizer
model_name = "meta-llama/Llama-2-7b-chat-hf"  # Replace with the actual model if necessary
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype=torch.float16, device_map="auto")

# Endpoint to handle chatbot requests
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()  # Get input data (user prompt)
    prompt = data.get('prompt', '')

    # Generate response
    inputs = tokenizer(prompt, return_tensors="pt").to("cuda" if torch.cuda.is_available() else "cpu")
    output = model.generate(**inputs, max_length=1000)
    response = tokenizer.decode(output[0], skip_special_tokens=True)

    # Return the generated response
    return jsonify({'response': response})

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
