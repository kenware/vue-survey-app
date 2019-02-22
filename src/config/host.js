
const host = process.env.NODE_ENV === 'production' ? 'https://assessments-api.herokuapp.com/api' : 'http://localhost:8000/api';

export default host;
