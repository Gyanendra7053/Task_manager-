import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";


function Login() {

    const { login } = useContext(AuthContext);

    const navigate = useNavigate();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);



    const handleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);


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


            navigate("/dashboard");


        } 
        catch (error) {

            console.log(error);


            alert(
                error.response?.data?.message ||
                "Login Failed"
            );

        }
        finally {

            setLoading(false);

        }

    };




    return (


        <div className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-gradient-to-br
            from-blue-600
            via-purple-600
            to-pink-500
            px-4
        ">


            <div className="
                w-full
                max-w-md
                bg-white/90
                backdrop-blur-lg
                rounded-2xl
                shadow-2xl
                p-8
            ">


                <div className="text-center mb-8">


                    <h1 className="
                        text-4xl
                        font-bold
                        text-gray-800
                    ">
                        Welcome Back 👋
                    </h1>


                    <p className="
                        text-gray-500
                        mt-2
                    ">
                        Login to manage your tasks
                    </p>


                </div>





                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >



                    <div>

                        <label className="
                            block
                            text-sm
                            font-medium
                            text-gray-700
                            mb-1
                        ">
                            Email
                        </label>


                        <input

                            type="email"

                            placeholder="Enter your email"

                            value={email}

                            onChange={(e)=>
                                setEmail(e.target.value)
                            }

                            className="
                                w-full
                                px-4
                                py-3
                                border
                                rounded-xl
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                                transition
                            "

                            required

                        />


                    </div>





                    <div>


                        <label className="
                            block
                            text-sm
                            font-medium
                            text-gray-700
                            mb-1
                        ">
                            Password
                        </label>



                        <input

                            type="password"

                            placeholder="Enter your password"

                            value={password}

                            onChange={(e)=>
                                setPassword(e.target.value)
                            }


                            className="
                                w-full
                                px-4
                                py-3
                                border
                                rounded-xl
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                                transition
                            "

                            required

                        />


                    </div>






                    <button

                        disabled={loading}

                        className="
                            w-full
                            py-3
                            rounded-xl
                            text-white
                            font-semibold
                            bg-blue-600
                            hover:bg-blue-700
                            transition
                            duration-300
                            disabled:opacity-50
                        "

                    >

                        {
                            loading
                            ?
                            "Logging in..."
                            :
                            "Login"
                        }


                    </button>




                </form>






                <p className="
                    text-center
                    text-gray-600
                    mt-6
                ">

                    Don't have an account?


                    <Link

                        to="/register"

                        className="
                            text-blue-600
                            font-semibold
                            ml-2
                            hover:underline
                        "

                    >

                        Register

                    </Link>


                </p>




            </div>


        </div>

    );

}


export default Login;