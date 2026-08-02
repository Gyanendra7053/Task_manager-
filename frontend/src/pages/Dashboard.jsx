import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../Components/Navbar";


function Dashboard() {

    const [tasks, setTasks] = useState([]);



    const fetchTasks = async () => {

        try {

            const response = await api.get("/api/tasks");

            setTasks(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const addTask=(task)=>{
        setTasks((prev)=>[
            ...prev,
            task
        ])
    }

    useEffect(() => {

        fetchTasks();

    }, []);


return (

<div>

    <Navbar />

    <div className="p-10">

        <h1 className="text-3xl font-bold mb-5">
            My Tasks
        </h1>


        <CreateTask 
            onTaskCreated={addTask}
        />


        {
            tasks.map((task)=>(
                <div key={task.id}>
                    {task.title}
                </div>
            ))
        }

    </div>

</div>

)

}


export default Dashboard;