const getJWT = () => {
    return localStorage.getItem('jwtToken');
}

export default getJWT;