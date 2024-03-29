import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from 'date-fns'

const currentDate = new Date();

export default function Allevents() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [upcomingEvents, setUpcomingEvents] = useState();

  const fetchEvents = async () => {
    try {
        let url = `${import.meta.env.VITE_BASE_API_URL}/event`
        if(selectedCategory !== 'All'){
        url += `?category=${selectedCategory}`
        }
        const response = await axios.get(
        url
        );
      if (response.status === 200) {
        const data = response.data;
        const filteredUpcomingEvents = data.filter(
          (event) => new Date(event.date) >= currentDate
        );

        setUpcomingEvents(filteredUpcomingEvents);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [selectedCategory]);


  return (
    <div className="venue">
    <h1>Upcoming Events</h1>
    <div className="categoryMenu">
            <select className="form-select" onChange={(event)=>(setSelectedCategory(event.target.value))}>
                <option value='All'>All categories</option>
                <option>Music</option>
                <option>Photography</option>
                <option>Coding</option>
                <option>Cooking</option>
                <option>Gardening</option>
                <option>Beauty</option>
                <option>Domestic-Skills</option>
                <option>Languages</option>
                <option>Other</option>
            </select>
        </div>

    <div className="grid">
      {upcomingEvents ? 
      upcomingEvents.length > 0 ? 
      (
      
          upcomingEvents.map((event) => (
            <div key={event._id} className="container">
              <Link to={`/eventdets/${event._id}`}>
              <div className="sqcontainer">
                <img src={event.imageUrl} alt={event.title} />
              </div>

              <div className="venueData">
                <h2>{event.title}</h2>
              </div>
              </Link>
            </div>
          ))
        
      ) 
      : <p>No upcoming events to show</p>: (
        <p>Loading events...</p>
      )}
    </div>

    <div className="homeButtonDiv" style={{textAlign: 'center'}}>
            <Link to={'/allskills'} className="transButton">See all skills</Link>
            </div>
    </div>
  );
}
