// useUser.js
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hook/useAuth";
import axios from "axios";

const useUser = () => {
  const { user, loading } = useAuth();

  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ["isUser", user?.email || null],
    enabled: !!user?.email, // Ensure that the query is only enabled when user email is available
    queryFn: async () => {
      try {
        if (user?.email) {
          console.log("email: " + user.email);
          const res = await axios.get(
            `http://localhost:5000/users/user/${user.email}`
          );
          console.log( res.data.user);
          return res.data.user;
        }

        return null;
      } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
      }
    },
  });

  return [userData, isUserLoading];
};

export default useUser;
