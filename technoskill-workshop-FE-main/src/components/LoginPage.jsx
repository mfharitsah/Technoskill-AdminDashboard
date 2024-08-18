import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/manager/login", {name , password});
      if(response.status !== 200) throw new Error("Login failed");
      console.log(response.data);
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div id="login-page" className="min-h-screen w-full bg-[image:var(--image-url)] bg-cover bg-dark-2"
      style={{'--image-url': `url(${bg})`}}
    >

    </div>
  );
}
