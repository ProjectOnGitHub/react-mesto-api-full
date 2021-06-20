const { NODE_ENV } = process.env
const baseUrl = (NODE_ENV === 'production') ? 'https://api-mesto.praktikum.space' : 'http://localhost:3003';
export default baseUrl;