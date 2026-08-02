import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function Navbar(){

    const { logout } = useContext(AuthContext);

    const navigate = useNavigate();


    const handleLogout = ()=>{

        logout();

        navigate("/login");

    };


    return (

        <nav className="flex justify-between p-5 shadow">

            <h1 className="font-bold text-xl">
                Task Manager
            </h1>


            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                Logout
            </button>


        </nav>

    )

}


export default Navbar;