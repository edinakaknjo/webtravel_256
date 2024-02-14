import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/addTravel.css';

const Travels = () => {
    const clear = {
        naziv: '',
        slika: '',
        opis: '',
        polazak: '',
        povratak: ''
    }

    const [travel, setTravel] = useState([]);
    
    const [newTravel, setNewTravel] = useState({
        naziv: '',
        slika: '',
        opis: '',
        polazak: '',
        povratak: ''
    });
    const uloga = localStorage.getItem('uloga');
    const navigate = useNavigate();



    useEffect(() => {
        allTravels();
    }, []);

    const allTravels= async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/travels');
            setTravel(response.data);
        } catch (error) {
            console.error('Error fetching travel', error);
        }
    };
    
    const handlePromjenaUnosa = (event) => {
        const { name, value } = event.target;
        setNewTravel({ ...newTravel, [name]: value });
    };
    
    
    const addTravel = async () => {
        if (Object.values(newTravel).some(value => value === '')) {
            alert('Please fill out all fields.');
            return;
        }
        try {
            const token = await localStorage.getItem('token');
            await axios.post('http://localhost:3001/api/travels/dodaj', newTravel, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setNewTravel(clear);
            alert('Putovanje uspješno dodano');
        } catch (error) {
            console.error('Error adding new travel', error);
        }
    };

    return (
        <div className="travel-form-container">
          <h2>Dodaj putovanje</h2>
          <form onSubmit={addTravel}>
            <div className="form-group">
              <label htmlFor="naziv">Destinacija:</label>
              <input className='input-style'
                type="text"
                name="naziv"
                value={newTravel.naziv}
                onChange={handlePromjenaUnosa}
              />
            </div>
            <div className="form-group">
              <label htmlFor="slika">Slika URL:</label>
              <input className='input-style'
                type="text"
                name="slika"
                value={newTravel.slika}
                onChange={handlePromjenaUnosa}
              />
            </div>
            <div className="form-group">
              <label htmlFor="opis">Opis:</label>
              <textarea className='input-style'
                name="opis"
                value={newTravel.opis}
                onChange={handlePromjenaUnosa}
              ></textarea>
            </div>
             <div className="form-group">
              <label htmlFor="polazak">Polazak:</label>
              <input className='input-style'
                type="date"
                name="polazak"
                value={newTravel.polazak}
                onChange={handlePromjenaUnosa}
              />
            </div>
            <div className="form-group">
              <label htmlFor="povratak">Povratak:</label>
              <input className='input-style'
                type="date"
                name="povratak"
                value={newTravel.povratak}
                onChange={handlePromjenaUnosa}
              />
            </div>
            <button className='dugme' type="submit">Dodaj putovanje</button>
          </form>
          <br/>
          <button className='dugme' onClick={() => navigate('/home')}>Back to Home</button>
        </div>
      );
    
}
export default Travels;