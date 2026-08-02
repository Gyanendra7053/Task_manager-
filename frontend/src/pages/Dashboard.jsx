import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";


function Dashboard() {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();



    useEffect(() => {

        fetchTasks();

    }, []);




    // Fetch Tasks
    const fetchTasks = async () => {

        try {

            const response = await api.get("/api/tasks");

            console.log(response.data);

            setTasks(response.data);

        } 
        catch(error) {

            console.log(error);

        }
        finally {

            setLoading(false);

        }

    };





    // Delete Task
    const deleteTask = async(id)=>{

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );


        if(!confirmDelete)
            return;



        try {

            await api.delete(`/api/tasks/${id}`);


            setTasks((prevTasks)=>
                prevTasks.filter(
                    task => task.id !== id
                )
            );


          


        }
        catch(error){

            console.log(error);

            

        }

    };





    if(loading){

        return (

            <div className="
                min-h-screen 
                flex 
                justify-center 
                items-center
            ">

                <h2 className="text-2xl font-semibold">
                    Loading...
                </h2>

            </div>

        );

    }





    return (

        <div className="min-h-screen bg-gray-100">


            <Navbar />



            <div className="max-w-6xl mx-auto p-8">



                <div className="
                    flex 
                    justify-between 
                    items-center 
                    mb-8
                ">


                    <div>

                        <h1 className="
                            text-3xl 
                            font-bold
                        ">
                            My Tasks
                        </h1>


                        <p className="
                            text-gray-500 
                            mt-2
                        ">
                            Total Tasks : {tasks.length}
                        </p>


                    </div>



                    <button

                        onClick={() => navigate("/create-task")}

                        className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            px-5
                            py-3
                            rounded-lg
                        "
                    >

                        + Add Task

                    </button>


                </div>





                {
                    tasks.length === 0 ?


                    (

                        <div className="
                            bg-white
                            rounded-xl
                            shadow
                            p-12
                            text-center
                        ">

                            <h2 className="
                                text-2xl
                                font-semibold
                            ">
                                No Tasks Found
                            </h2>


                            <p className="text-gray-500 mt-2">
                                Create your first task
                            </p>


                        </div>

                    )

                    :

                    (

                        <div className="
                            grid
                            md:grid-cols-2
                            lg:grid-cols-3
                            gap-6
                        ">


                        {
                            tasks.map((task)=>(


                                <div

                                    key={task.id}

                                    className="
                                        bg-white
                                        rounded-xl
                                        shadow-md
                                        p-6
                                        hover:shadow-xl
                                        transition
                                    "
                                >



                                    <div className="
                                        flex
                                        justify-between
                                        items-start
                                    ">



                                        <h2 className="
                                            text-xl
                                            font-bold
                                        ">

                                            {task.title}

                                        </h2>




                                        <span

                                        className={`
                                            px-3
                                            py-1
                                            rounded-full
                                            text-sm

                                            ${
                                                task.completed
                                                ?
                                                "bg-green-100 text-green-700"
                                                :
                                                "bg-yellow-100 text-yellow-700"
                                            }
                                        `}

                                        >

                                            {
                                                task.completed
                                                ?
                                                "Completed"
                                                :
                                                "Pending"
                                            }

                                        </span>


                                    </div>




                                    <p className="
                                        text-gray-600
                                        mt-4
                                    ">

                                        {task.description}

                                    </p>





                                    <div className="
                                        flex
                                        gap-3
                                        mt-6
                                    ">




                                        <button

                                        onClick={() =>
                                            navigate(
                                                `/edit-task/${task.id}`
                                            )
                                        }

                                        className="
                                            bg-yellow-500
                                            hover:bg-yellow-600
                                            text-white
                                            px-4
                                            py-2
                                            rounded-lg
                                        "

                                        >

                                            Edit

                                        </button>





                                        <button

                                        onClick={() =>
                                            deleteTask(task.id)
                                        }

                                        className="
                                            bg-red-500
                                            hover:bg-red-600
                                            text-white
                                            px-4
                                            py-2
                                            rounded-lg
                                        "

                                        >

                                            Delete

                                        </button>



                                    </div>



                                </div>


                            ))
                        }


                        </div>

                    )

                }



            </div>


        </div>

    );

}


export default Dashboard;