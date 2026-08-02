import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function Navbar(){

    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleLogout = () => {

        logout();

        navigate("/login");

    };


    return (

        <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center">


            <h1 className="text-2xl font-bold">
                Task Manager
            </h1>


            <button
                onClick={handleLogout}
                className="
                bg-red-500 
                px-5 
                py-2 
                rounded-lg
                hover:bg-red-600
                transition
                "
            >
                Logout
            </button>


        </nav>

    );
}


export default Navbar;