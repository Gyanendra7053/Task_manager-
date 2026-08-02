import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";


function EditTask(){

    const {id} = useParams();

    const navigate = useNavigate();


    const [task,setTask] = useState({
        title:"",
        description:"",
        completed:false
    });


    useEffect(()=>{

        fetchTask();

    },[]);



    const fetchTask = async()=>{

        try{

            const response = await api.get(
                `/api/tasks/${id}`
            );


            setTask(response.data);


        }
        catch(error){

            console.log(error);

        }

    };




    const handleChange=(e)=>{

        setTask({

            ...task,

            [e.target.name]:e.target.value

        });

    };




    const updateTask=async(e)=>{

        e.preventDefault();


        try{

            await api.put(
                `/api/tasks/${id}`,
                task
            );
            navigate("/dashboard");


        }
        catch(error){

            console.log(error);

        }

    };



    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center">


            <form
            onSubmit={updateTask}
            className="
            bg-white
            p-8
            rounded-xl
            shadow-lg
            w-96
            ">


                <h1 className="text-2xl font-bold mb-6">
                    Edit Task
                </h1>



                <input

                name="title"

                value={task.title}

                onChange={handleChange}

                className="
                border
                p-3
                w-full
                rounded
                mb-4
                "

                />



                <textarea

                name="description"

                value={task.description}

                onChange={handleChange}

                className="
                border
                p-3
                w-full
                rounded
                mb-4
                "

                />



                <button

                className="
                bg-blue-600
                text-white
                w-full
                py-3
                rounded-lg
                hover:bg-blue-700
                "

                >

                    Update Task

                </button>


            </form>


        </div>

    );

}


export default EditTask;