const prod = {
	BASE_URL: 'https://rotcl-backend.onrender.com'
};

const dev = {
	BASE_URL: 'https://rotcl-backend.onrender.com',
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;