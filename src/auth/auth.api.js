import apiClent from "./api"


const AuthApi = {
    //============== Register =============//
    signup: async (userData) => {
        try {
            const res = await apiClent.post("/register", userData);
            return res.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    //============== Login =============//
    login: async (credentials) => {
        try {
            const res = await apiClent.post("/login", credentials);
            return res.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    //============== Forget Password =============//
    forgetPassword: async (email) => {
        try {
            const res = await apiClent.post('/forget-password', { email });
            return res.data;
        } catch (error) {
            throw error.response.data;
        }
    },
    //============== Reset Password =============//
    resetPassword : async(data)=>{
        try{
            const res = await apiClent.post('/reset', data);
            return res.data;
        }catch(error){  
            throw error.response.data;
        }
    } 


}

export default AuthApi;