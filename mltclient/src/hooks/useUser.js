import { useEffect, useState } from "react";
import { getUser } from "../services/apiServices";

export const useCurrentUser = () => {
  const [user, setUser] = useState([]);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(); 
        if (userData) {
          setUser(userData);
          setRole(userData.role || null);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null); 
        setRole(null); 
      }
    };

    fetchUser();
  }, []);
  return { user, role };
};
