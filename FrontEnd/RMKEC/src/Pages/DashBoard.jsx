import React from 'react';
import DashBoard_hod from './Dashboard_hod';
import Dashboard_admin from './Dashboard_admin';
import Attendance_DB_Dept from '../Attendance_Component/Attendance_DB_Dept';
import withAuthorization from '../Components/WithAuthorization';
import DashBoard_Hall from '../HallBooking_Component/DashBoard_Hall';

const DashBoard = () => {
  const role = window.localStorage.getItem('userType');
  
  if (!role) {
    return null;
  }

  return (
    <>
      {role === 'hod' && <DashBoard_hod />}
      {role === 'Attendance Manager' && <Attendance_DB_Dept />}
      {role==='Event Coordinator' && <DashBoard_Hall/>}
      {role !== 'hod' && role !== 'Attendance Manager' && role!=='Event Coordinator' && <Dashboard_admin />}
    </>
  );
}

export default withAuthorization(['hod', 'Principal', 'VC', 'Dean', 'Attendance Manager','Event Coordinator',"academic_coordinator","IQAC"])(DashBoard);
