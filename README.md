# Setting Up Backend Server

## Navigate to the Backend Directory & Clone the Repository:

```bash
cd ..
mkdir backend
cd backend
git clone https://github.com/your-username/neighborserve_server.git
cd NeighborServe-Server
npm install
touch .env
PORT=5001
MONGODB_URI=your-mongodb-connection-uri
SECRET_KEY=your-secret-key-for-jwt
npm start

