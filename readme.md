# omni-bot: personal ai portfolio clone

welcome to the repository for omni-bot, a custom ai portfolio clone i built using python, fastapi, and the groq api running meta's llama 3.1 model. instead of providing recruiters with a traditional static resume, i designed this custom retrieval-augmented generation (rag) style clone to actively answer questions about my technical skills, internship experiences, and full-stack projects in real time. the bot is strictly context-bound to my professional profile, meaning it acts as a 24/7 interactive representative that can instantly and accurately discuss my coding background, work ethic, and achievements while demonstrating my ability to build scalable, high-speed api endpoints.

# tech stack

- **backend framework:** fastapi (python)
- **ai engine:** groq api (meta llama-3.1-8b-instant)
- **security:** python-dotenv for environment variable management
- **server:** uvicorn

# key features

- **blazing fast responses:** powered by groq's custom hardware and meta's llama 3.1 model, allowing for near-instant conversational replies.
- **context-aware constraints:** the ai is hard-prompted to only answer questions using the provided professional knowledge base, gracefully redirecting off-topic queries.
- **recruiter-proof stability:** utilizes groq's high-throughput rate limits, ensuring the bot remains stable and responsive even during rapid-fire testing.
- **cors enabled:** fully configured to accept cross-origin requests, making it ready to be integrated with any frontend web framework.

# local development setup

follow these steps to run the omni-bot backend on your local machine.

```bash
1. clone the repository
git clone [https://github.com/mohammed-owzzz/omni-bot.git](https://github.com/mohammed-owzzz/omni-bot.git)
cd omni-bot

2. install dependencies
ensure you have python installed, then run:

Bash
pip install -r requirements.txt

3. set up environment variables
create a file named .env in the root directory of the project. add your groq api key to this file:

Code snippet
GROQ_API_KEY=your_actual_api_key_here
(note: the .env file is included in .gitignore to prevent accidental credential leaks).

4. run the server
start the fastapi server using uvicorn:

Bash
uvicorn main:app --reload
the api will be available at http://127.0.0.1:8000.

api documentation
post /ask
accepts a json payload containing a user's question and returns the ai's generated response.

request body:

JSON
{
  "question": "what did you do during your internship at composent?"
}
response:

JSON
{
  "response": "during my time as a junior ai trainee intern at composent, i gained hands-on exposure to real-world ai pipelines. i collaborated closely with senior developers to understand project architectures, clean data, and successfully integrate ai features into their existing software!"
}