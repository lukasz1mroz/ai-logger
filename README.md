# Log Analyzer

This project leveraging AI capabilities to help teams and business owners to quickly analyze application and error logs based on provided criteria. It's using React frontend wrapper (create-react-app with Antd) and Node.js backend server to provess the requests. 

## Installation and run

1. Install backend dependencies witn ```npm i``` in /backend folder. Next, add environment variables ```.env``` file and run ```npm run:dev``` script to start the server. Other scripts for building the code and production run are provided in ```package.json``` file.

2. Similarly for frontend, install dependencies witn ```npm i``` in /frontend folder and run ```npm run``` script to run it. See ```package.json``` for other scripts (build, test, lint).

3. Environment variables to setup the backend:
```
API_VERSION=<date>
API_KEY=<api_key>
BASE_URL=<base_url>
EMBEDDINGS_MODEL=<embeddings_model>
COMPLETIONS_MODEL=<completions_model>
PORT=<port>
```