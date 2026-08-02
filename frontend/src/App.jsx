import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateTask from "./Components/CreateTask";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import EditTask from "./pages/EditTask";


function App() {

    console.log("APP UPDATED");


    return (

        <BrowserRouter>

            <Routes>


                <Route
                    path="/"
                    element={<Home />}
                />


                <Route
                    path="/login"
                    element={<Login />}
                />


                <Route
                    path="/register"
                    element={<Register />}
                />


                <Route
                    path="/create-task"
                    element={
                        <ProtectedRoute>
                            <CreateTask />
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/edit-task/:id"
                    element={
                        <ProtectedRoute>
                            <EditTask />
                        </ProtectedRoute>
                    }
                />


            </Routes>


        </BrowserRouter>

    );

}


export default App;