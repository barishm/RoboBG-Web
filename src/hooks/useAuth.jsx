import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useReauthMutation } from "../app/services/authApiSlice";
import { jwtDecode } from "jwt-decode";
import { setCredentials, logOut } from "../app/redux/authSlice";

const useAuth = () => {
  const [reauth] = useReauthMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken")?.replace(/^"(.*)"$/, "$1");
    
    if (!refreshToken) {
      dispatch(logOut());
      return;
    }

    const refreshAccessToken = async () => {
      try {
        const { data } = await reauth(refreshToken).unwrap();
        const decoded = jwtDecode(data.access_token);

        dispatch(setCredentials({
          user: decoded.sub,
          role: decoded.role,
          accessToken: data.access_token,
        }));

      } catch (error) {
        console.error("Token refresh failed:", error);
        dispatch(logOut());
        localStorage.clear();
      }
    };

    refreshAccessToken(); // Run on first load

    const interval = setInterval(refreshAccessToken, 900000); // Refresh every 15 minutes
    return () => clearInterval(interval);
  }, [dispatch, reauth]);
};

export default useAuth;
