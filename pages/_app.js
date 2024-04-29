import "@/styles/globals.css";
import axios from "axios";
import { AuthProvider } from "../contexts/AuthContext";
import Modal from "react-modal";

axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.baseURL = "http://192.168.50.49:4002";
axios.defaults.baseURL = "http://localhost:3001";
// axios.defaults.baseURL = "http://192.168.50.213:3001";
// axios.defaults.baseURL = "http://192.168.50.212:3001";
export default function App({ Component, pageProps }) {
  // axios.defaults.baseURL = process.env.BASE_URL_BE;
  // axios.defaults.baseURL = "http://192.168.50.213:3001";
  // axios.defaults.baseURL = "http://192.168.50.212:3001";
  Modal.setAppElement("#__next");
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
