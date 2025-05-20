import jwtDecode from 'jwt-decode';

const refreshToken = localStorage.getItem('refreshToken');
const decoded = jwtDecode(refreshToken);
const userId = decoded.id;
