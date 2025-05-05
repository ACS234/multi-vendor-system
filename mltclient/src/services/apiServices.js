import { toast } from 'react-toastify';
import axiosInstance from './axiosInstances'
import { ACCESS_TOKEN } from '../constants';


const getData = async (url) => {
    try {
        const response = await axiosInstance.get(url);
        return response?.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const postData = async (url, data) => {
    try {
        const response = await axiosInstance.post(url, data);
        return response;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

// const updateData = async (url, data) => {
//     try {
//         const response = await axiosInstance.patch(url, data);
//         return response.data;
//     } catch (error) {
//         console.error('Error updating data:', error);
//         throw error;
//     }
// };

// const deleteData = async (url, config) => {
//     try {
//         const response = await axiosInstance.delete(url, config);
//         return response.data;
//     } catch (error) {
//         console.error('Error deleting data:', error);
//         throw error;
//     }
// };


export const addProduct=async(data)=>{
    try {
        const response=await postData(`/api/products/`,data)
        return response;
    } catch (error) {
        console.log("something went wrong",error)
    }
}

export const getProduct = async () => {
    try {
      const response = await getData(`/api/products/`);
      return response;
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Something went wrong while fetching user");
      throw error;
    }
  };


  export const getProductDetail = async (id) => {
    try {
      const response = await getData(`/api/products/${id}/`);
      return response;
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Something went wrong while fetching user");
      throw error;
    }
  };

export const getUser = async () => {
    try {
      const response = await getData(`/auth/user/`);
      return response;
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Something went wrong while fetching user");
      throw error;
    }
  };
  
  

const registerData = async (url, data) => {
    try {
        const response = await postData(url, data);
        return response.data;
    } catch (error) {
        console.error('Error registering:', error);
        throw error;
    }
};

export const Signup = async (data) => {
    try {
        return await registerData(`/auth/register/`, data);
    } catch (error) {
        console.log("Signup error", error);
        throw error;
    }
};

export const Login = async (data) => {
    try {
        const response = await postData(`/auth/login/`, data);
        toast.success("Login successful!");
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        toast.error("Invalid credentials!");
        throw error;
    }
};


export const tokenRefresh = async (data) => {
    try {
        return await postData(`/auth/token/refresh/`, data);
    } catch (error) {
        console.error('Token refresh error:', error);
        return null;
    }
};