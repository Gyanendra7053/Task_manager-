import { useState } from "react";
import api from "../api/axios";


function CreateTask({ onTaskCreated }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(
                "/api/tasks",
                {
                    title,
                    description,
                    completed: false
                }
            );


            onTaskCreated(response.data);


            setTitle("");
            setDescription("");


        } catch(error) {

            console.log(error);

        }

    };


    return (

        <form
            onSubmit={handleSubmit}
            className="border p-5 rounded mb-5"
        >

            <h2 className="text-xl font-bold mb-3">
                Create Task
            </h2>


            <input
                className="border p-2 w-full mb-3"
                placeholder="Task title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
            />


            <textarea
                className="border p-2 w-full mb-3"
                placeholder="Task description"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
            />


            <button
                className="bg-black text-white px-4 py-2 rounded"
            >
                Add Task
            </button>


        </form>

    );

}

export default CreateTask;