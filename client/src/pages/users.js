import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/user.css";

const Users = () => {
    const [Users, setUsers] = useState([]);
    const uloga = localStorage.getItem("uloga");
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/users/users", {
                headers: {
                     Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Error occurred while fetching users!", error);
        }
    };
        
    const handleToggleStatus = async (id, aktivan) => {
        try {
            await axios.put(`http://localhost:3001/api/users/deaktiviraj/${id}`, { aktivan: !aktivan }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            fetchUsers();
        } catch (error) {
            console.error("Error occurred while toggling user status", error);
        }
    };
    
    

    return (
        <div className="container">
            <h1 className="title">Korisnici</h1>
            <ul className="user-list">
                {Users.map((user) => (
                <li key={user._id} className="user-item">
                    {user.korisnickoIme}{" "}
                    {uloga === "admin" && (
                    <button className="button" onClick={() => handleToggleStatus(user._id, user.aktivan)}>
                        {user.aktivan ? 'Deaktiviraj' : 'Aktiviraj'}
                    </button>
                    )}
                </li>
                ))}
            </ul>
            <button className="button" onClick={() => navigate("/home")}>Back</button>
        </div>
    );
};

export default Users;