import { useQuery } from "@tanstack/react-query";
import useAuth from "../hook/useAuth";
import axios from "axios";


const useAdmin = () => {
    const {user, loading} = useAuth();

    
    const {data: isAdmin, isLoading: isAdminLoading} = useQuery({
        queryKey: ['isAdmin', user?.email],
        // enabled: loading,
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/users/admin/${user?.email}`)
         
            return res.data.admin;
        }
    })
    
    return [isAdmin,isAdminLoading]
};

export default useAdmin;