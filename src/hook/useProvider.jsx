// useProvider.js
import axios from "axios";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useProvider = () => {
  const { user, loading } = useAuth();

  const { data: isProvider, isLoading: isProviderLoading } = useQuery({
    queryKey: ["isProvider", user?.email || null],
    enabled: !!user?.email, // Ensure that the query is only enabled when user email is available
    queryFn: async () => {
      try {
        if (user?.email) {
          const res = await axios.get(
            `http://localhost:5000/users/provider2/${user.email}`
          );
          return res.data.provider;
        }

        return null;
      } catch (error) {
        console.error("Error fetching provider data:", error);
        return null;
      }
    },
  });

  return [isProvider, isProviderLoading];
};

export default useProvider;
