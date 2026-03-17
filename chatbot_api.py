from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Simple health chatbot - no API key needed!
def get_health_response(query):
    query = query.lower()
    
    if any(word in query for word in ['fever', 'bukhar', 'temperature']):
        return "Fever ke liye: Paracetamol lo, paani zyada piyo, aur rest karo. Agar 3 din se zyada ho toh doctor se milo."
    
    elif any(word in query for word in ['headache', 'sir dard', 'head']):
        return "Headache ke liye: Paani piyo, dark room mein rest karo. Agar bahut tez ho toh doctor se consult karo."
    
    elif any(word in query for word in ['cold', 'cough', 'khansi', 'zukam']):
        return "Cold/Cough ke liye: Garam paani piyo, steam lo, Vitamin C lo. Zyada ho toh doctor dikhao."
    
    elif any(word in query for word in ['stomach', 'pet', 'vomit', 'diarrhea', 'ulti']):
        return "Pet ki problem ke liye: ORS piyo, halka khana khao (khichdi), bahar ka khana avoid karo."
    
    elif any(word in query for word in ['blood pressure', 'bp', 'hypertension']):
        return "BP ke liye: Namak kam khao, exercise karo, stress kam karo. Regular check-up zaroor karao."
    
    elif any(word in query for word in ['diabetes', 'sugar', 'blood sugar']):
        return "Diabetes ke liye: Meetha avoid karo, exercise karo, regular blood sugar check karao."
    
    elif any(word in query for word in ['doctor', 'verify', 'check']):
        return "Doctor verify karne ke liye upar 'Verify Doctor' section use karo. Registration number se check kar sakte ho."
    
    elif any(word in query for word in ['appointment', 'book', 'booking']):
        return "Appointment book karne ke liye 'Book an Appointment' section mein jao aur form fill karo!"
    
    elif any(word in query for word in ['hello', 'hi', 'hey', 'namaste']):
        return "Namaste! Main Ayura Health Assistant hoon. Aap mujhse koi bhi health related sawaal pooch sakte hain!"
    
    else:
        return "Mujhe samajh nahi aaya. Kripya apni problem aur detail mein batayein. Main fever, headache, cold, stomach, BP, diabetes jaisi problems mein madad kar sakta hoon!"

@app.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.get_json()
    user_query = data.get('query', '')
    response = get_health_response(user_query)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(port=5000, debug=True)

