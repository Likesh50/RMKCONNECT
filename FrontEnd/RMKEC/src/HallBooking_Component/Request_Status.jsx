import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventDetails from './EventDetails';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Request_Status.css';

const Request_Status = () => {
  const [eventData, setEventData] = useState([]);
  const role = window.localStorage.getItem("userType");

  const notifyFailure = (error) => {
    toast.error(error, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Zoom,
    });
  };

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/hall/hall_requests_status', {
          department: window.localStorage.getItem("department"),
          role: role
        });
        setEventData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
        if (error.response && error.response.data && error.response.data.error) {
          notifyFailure(error.response.data.error);
        } else {
          notifyFailure('An unexpected error occurred.');
        }
      }
    };

    fetchEventData();
  }, []);   
  const handleDelete = async (id) => {
    try {
      await axios.post('http://localhost:3000/hall/hall_requests_remove', { id: id });
      setEventData(eventData.filter((event) => event.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
      notifyFailure('Error deleting event');
    }
  };
  console.log(eventData);
  return (
    <div>
      {eventData.map((event, index) => (
        <div className='event-container' key={index}>
          {((role === 'hod' || role === 'Event Coordinator') ||
            (role === 'academic_coordinator' && event.approvals.hod) ||
            (role === 'Principal' && event.approvals.hod && event.approvals.academic_coordinator)) && (
              <EventDetails needbutton={true} checkall={false} eventData={event} showdelete={true} onDelete={() => handleDelete(event.id)}/>
            )}
        </div>
      ))}
      <ToastContainer />
    </div>
  );
};

export default Request_Status;
