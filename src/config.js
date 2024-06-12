const prod = {
	SERVER_URL: 'https://rotcl-backend.onrender.com',
	SOCKET_URL: 'https://rotcl-socket.onrender.com'
};

const dev = {
	SERVER_URL: 'http://localhost:3001',
	SOCKET_URL: 'http://localhost:3500' 
};

export const config = process.env.REACT_APP_ENV === 'development' ? dev : prod;