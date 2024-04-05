import React from "react";

function NotAllowed() {
  return (
    <>
      <div className="thankyou-page-container">
        <div className="thanks-message">
          <h1>Access Denied</h1>
          <p>You are not authorized to access this page.</p>
        </div>
      </div>
    </>
  );
}

export default NotAllowed;
