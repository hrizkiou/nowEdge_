import jwtDecode from 'jwt-decode';
import { Cookies } from "react-cookie";

/**
 * Checks if user is authenticated
 */
const isUserAuthenticated = () => {
    const user = getLoggedInUser();
    //console.log('------isUserAuthenticated------',user)
    if (!user) {
        return false;
    }
    const decoded = jwtDecode(user.token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        console.warn('access token expired');
        return false;
    }
    else {
        return true;
    }
}

/**
 * Returns the logged in user
 */
const getLoggedInUser = () => {
    const cookies = new Cookies(); 
    const user = cookies.get("user");
    return user ? (typeof(user) == 'object'? user: JSON.parse(user)) : null;
}

/**
 * Returns the logged in user
 */
const getCredentialsUser = () => {
    const credentials = localStorage.getItem('credentials');
    return credentials ? (typeof(credentials) == 'object'? credentials: JSON.parse(credentials)) : null;
}


function authHeader(headers = null) {
  
    const user = getLoggedInUser();

    if (user) {
        return {
            ...{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "*",
                'Authorization': 'Bearer ' + user.token,
            },
            ...headers

        };
    } else {
        return {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin" : "*",
        };
    }
   
}

export { isUserAuthenticated, getLoggedInUser, getCredentialsUser ,authHeader };