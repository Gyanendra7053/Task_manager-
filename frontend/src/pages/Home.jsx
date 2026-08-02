import { useNavigate } from "react-router-dom";


function Home(){

    const navigate = useNavigate();


    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center">


            <div className="
                bg-white
                shadow-xl
                rounded-2xl
                p-10
                text-center
                w-96
            ">


                <h1 className="
                    text-4xl
                    font-bold
                    text-blue-600
                    mb-4
                ">
                    Task Manager
                </h1>


                <p className="
                    text-gray-600
                    mb-8
                ">
                    Manage your daily tasks easily and stay productive.
                </p>



                <div className="flex flex-col gap-4">


                    <button

                        onClick={() => navigate("/login")}

                        className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            py-3
                            rounded-lg
                            font-semibold
                        "

                    >
                        Login
                    </button>




                    <button

                        onClick={() => navigate("/register")}

                        className="
                            border
                            border-blue-600
                            text-blue-600
                            hover:bg-blue-50
                            py-3
                            rounded-lg
                            font-semibold
                        "

                    >
                        Register
                    </button>


                </div>


            </div>


        </div>

    );

}


export default Home;