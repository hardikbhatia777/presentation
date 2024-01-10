import React, { useState } from "react";
import "./ReportModal.css"; // Import the CSS file for modal styles
import { Timestamp } from "firebase/firestore";
import { signOut, signIn, useSession, SessionProvider } from 'next-auth/react'


const formatTimestamp = (timestamp) => {
  if (timestamp instanceof Timestamp) {
    const date = timestamp.toDate();
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    return formattedDate;
  }
  return "N/A";
};

const ReportModal = ({ onClose, report }) => {

  const {data: session, status} = useSession();
  if (!report) return null;

  
  return (
    <div className={`modal-wrapper ${report ? "active" : ""}`}>
      <div className={`modal ${report ? "active" : ""}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="sessionid">Session ID: {report.sid}</h2>
            <button className="close-btn" onClick={onClose}>
              X
            </button>
          </div>
          <div className="modal-body">
            <div className="imagemain"> <img src={session?.user?.image} className="modal-image-placeholder">
              
            </img>
            </div>
            <div className="modal-details">
              <p>
                <strong>Disease:</strong> {report.disease}
              </p>
              <p>
                <strong>Time:  </strong>{formatTimestamp(report.timestamp)}
              </p>
              <p>
                <strong>Accuracy:</strong> {report.accuracy}
              </p>
              {/* Add more detailed information here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
