import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function CreateTask() {

    const navigate = useNavigate();

    const [task, setTask] = useState({
        title: "",
        description: "",
        completed: false
    });

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setTask({
            ...task,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/api/tasks", task);


            navigate("/dashboard");

        } catch (error) {

            console.log(error);

        }
    };

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center">

            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">

                <h1 className="text-3xl font-bold text-blue-600 mb-2">
                    Create New Task
                </h1>

                <p className="text-gray-500 mb-6">
                    Fill the details below to add a new task.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block mb-2 font-medium">
                            Task Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={task.title}
                            onChange={handleChange}
                            placeholder="Enter task title"
                            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={task.description}
                            onChange={handleChange}
                            rows="5"
                            placeholder="Enter task description"
                            className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            name="completed"
                            checked={task.completed}
                            onChange={handleChange}
                            className="w-5 h-5"
                        />

                        <label>
                            Mark as Completed
                        </label>
                    </div>

                    <div className="flex gap-4 pt-2">

                        <button
                            type="button"
                            onClick={() => navigate("/dashboard")}
                            className="w-1/2 border border-gray-400 py-3 rounded-lg hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="w-1/2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Create Task
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default CreateTask;