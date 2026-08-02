import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";


function Login(){

    const { login } = useContext(AuthContext);


    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");


    const handleLogin = async(e)=>{

        e.preventDefault();

        try {

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );


            login(response.data.token);

            alert("Login Successful");


        } catch(error){

            console.log(error);
            alert("Invalid Credentials");

        }

    }


    return (

        <div className="min-h-screen flex items-center justify-center">

            <form 
              onSubmit={handleLogin}
              className="w-96 p-6 shadow-lg rounded-lg"
            >

                <h1 className="text-2xl font-bold mb-5">
                    Login
                </h1>


                <input
                    className="border p-2 w-full mb-3"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />


                <input
                    className="border p-2 w-full mb-3"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />


                <button
                    className="bg-black text-white px-4 py-2 rounded w-full"
                >
                    Login
                </button>

            </form>

        </div>

    )
}


export default Login;