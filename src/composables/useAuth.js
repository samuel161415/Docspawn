import { ref } from "vue";

const user = ref({ name: "Hanan", email: "hanan@tec.tech" });
const token = ref(null);

if (typeof window !== "undefined") {
  user.value = JSON.parse(localStorage.getItem("user") || "null");
  token.value = localStorage.getItem("token") || null;
}

export function useAuth() {
  const setUser = (userData) => {
    user.value = userData;
    if (typeof window !== "undefined")
      localStorage.setItem("user", JSON.stringify(userData));
  };

  const setToken = (accessToken) => {
    token.value = accessToken;
    if (typeof window !== "undefined")
      localStorage.setItem("token", accessToken);
  };

  const fetchUserDetails = async () => {
    // Fetch user details using the token and set user value
    // Implement the actual fetch logic here
  };

  return {
    user,
    token,
    setUser,
    setToken,
    fetchUserDetails,
  };
}
