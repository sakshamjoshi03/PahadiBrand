import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// REGISTER
export const register = async (userData) => {

    const response = await axios.post(

        `${API_URL}/register`,

        userData

    );

    return response.data;

};

// LOGIN
export const login = async (credentials) => {

    const response = await axios.post(

        `${API_URL}/login`,

        credentials

    );

    return response.data;

};

// PROFILE
export const getProfile = async (token) => {

    const response = await axios.get(

        `${API_URL}/profile`,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    return response.data;

};