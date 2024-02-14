import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/travel.css';

const Home = () => {


    useEffect(() => {
          allTravels();
    }, []);
   
    const navigate = useNavigate();
    const [travels, settravels] = useState([]);
    const token = localStorage.getItem('token');
    const uloga = localStorage.getItem('uloga');
    
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('uloga');
        navigate('/login');
    };

    const allTravels = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/travels');
          settravels(response.data);
        } catch (error) {
          console.error('Error fetching', error);
        }
      };
    
    const deleteTravel = async (travelId) => {
        try {
            const token = await localStorage.getItem('token');
            await axios.delete(`http://localhost:3001/api/travels/${travelId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            allTravels(); 
        } catch (error) {
            console.error('Error deleting travel', error);
        }
    };

    const odaberiTravel = async (travelId) => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.post(
            `http://localhost:3001/api/travels/odaberi/${travelId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          
          alert('selected');
        } catch (error) {
          console.error('Error joining travel', error);
        }
      };
      
    
    
    return (
        <div>
        <h1>Home</h1>
        <button className='komande' onClick={handleLogout}>Logout</button>
        {uloga === 'admin' && (
            <>
            <button className='komande' onClick={() => navigate('/users')}>Users</button>
            <button className='komande' onClick={() => navigate('/travels')}>Travels</button>
            </>
        )}
            <div className="travel-container">
            {travels.map(travel => (
                <div className="travel-card" key={travel._id}>
                    <img src={travel.slika} alt={travel.naziv} />
                    <div>
                    <h2>{travel.naziv}</h2>
                    <p>{travel.opis}</p>
                    <p>Polazak: {new Date(travel.polazak).toLocaleDateString()}</p>
                    <p>Povratak: {new Date(travel.povratak).toLocaleDateString()}</p>
                    </div>
                    {uloga === 'admin' && <> <button className='dugme-delete' onClick={() => deleteTravel(travel._id)}>Obrisi</button></>}
                    {uloga === 'user' && <button className='dugme-join' onClick={() => odaberiTravel(travel._id)}>Odaberi</button>}
                    
                    
                </div>
            ))}
            </div>
        </div>
    );
};

export default Home;
