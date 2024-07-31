

// import React from 'react';
// import "./App.css"
// const Dashboard = () => {
//   const userData = JSON.parse(localStorage.getItem('user'));
//   const user = userData && userData.user_data && userData.user_data.length > 0 ? userData.user_data[0] : null;

//   return (
//     <div>
//       {user ? (
//         <div className='Dashbord-container'>
//           <h1 className='d-heading'>Welcome, {user.user_firstname} {user.user_lastname}!</h1>
//           <p className='d-para'>Email: {user.user_email}</p>
//           <p className='d-para'>Phone: {user.user_phone}</p>
//           <p className='d-para'>City: {user.user_city}</p>
//           <p className='d-para'>Zipcode: {user.user_zipcode}</p>
//         </div>
//       ) : (
//         <p>No user information available.</p>
//       )}
//     </div>
//   );
// };

// export default Dashboard;


import React, {useEffect } from 'react';
import './App.css';

const Dashboard = () => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const user = userData && userData.user_data && userData.user_data.length > 0 ? userData.user_data[0] : null;

  useEffect(() => {
    const sparkles = document.querySelectorAll('.sparkle');

    sparkles.forEach((sparkle, index) => {
      setTimeout(() => {
        sparkle.style.animationPlayState = 'running';
      });
    });

    setTimeout(() => {
      sparkles.forEach((sparkle) => (sparkle.style.animationPlayState = 'paused'));
    }, 2000);
  });

  return (
    <div className="dashboard-container">

<div className="sparkles">
        <img src="https://res.cloudinary.com/dxgbxchqm/image/upload/v1722423782/1000_F_311056275_h4Jr2gVVibsdyD4mitBNsDqlO19XMWLt_k8ro6p.jpg" className="sparkle" alt="sparkle" />
        <img src="https://res.cloudinary.com/dxgbxchqm/image/upload/v1722423782/1000_F_311056275_h4Jr2gVVibsdyD4mitBNsDqlO19XMWLt_k8ro6p.jpg" className="sparkle" alt="sparkle" />
        <img src="https://res.cloudinary.com/dxgbxchqm/image/upload/v1722423782/1000_F_311056275_h4Jr2gVVibsdyD4mitBNsDqlO19XMWLt_k8ro6p.jpg" className="sparkle" alt="sparkle" />
        <img src="https://res.cloudinary.com/dxgbxchqm/image/upload/v1722423782/1000_F_311056275_h4Jr2gVVibsdyD4mitBNsDqlO19XMWLt_k8ro6p.jpg" className="sparkle" alt="sparkle" />
        <img src="https://res.cloudinary.com/dxgbxchqm/image/upload/v1722423782/1000_F_311056275_h4Jr2gVVibsdyD4mitBNsDqlO19XMWLt_k8ro6p.jpg" className="sparkle" alt="sparkle" />
      </div>

      {user ? (
        <div className="dashboard-content">
          <div className="profile-header">
            <h1 className="greeting">Welcome, {user.user_firstname} {user.user_lastname}!</h1>
          </div>

          <div style={{display:"flex",justifyContent:"space-around"}}>

          <div className="profile-picture">
              <img src="https://res.cloudinary.com/dxgbxchqm/image/upload/v1722421624/image-2_jf7vg4.jpg" alt="Profile" />
            </div>
          <div className="user-info">
            <p className="info-item"><strong>Email:</strong> {user.user_email}</p>
            <p className="info-item"><strong>Phone:</strong> {user.user_phone}</p>
            <p className="info-item"><strong>City:</strong> {user.user_city}</p>
            <p className="info-item"><strong>Zipcode:</strong> {user.user_zipcode}</p>
          </div>

          </div>
        </div>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
};

export default Dashboard;
