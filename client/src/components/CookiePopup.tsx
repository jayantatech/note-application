"use client";
import { useState, useEffect } from "react";

const CookiePopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkThirdPartyCookies = async () => {
      try {
        await fetch(
          "https://note-application-bbc9.onrender.com/api/check-third-party-cookies",
          {
            credentials: "include",
          }
        );
        setIsVisible(false);
      } catch {
        setIsVisible(true);
      }
    };

    checkThirdPartyCookies();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="cookie-popup">
        <div className="cookie-popup-content">
          <p>
            This site requires third-party cookies to be enabled. Please enable
            third-party cookies in your browser settings.
          </p>
          <button onClick={handleClose}>Close</button>
        </div>
        <style jsx>{`
          .cookie-popup {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: white;
            border: 1px solid #ccc;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            padding: 10px;
            border-radius: 5px;
          }
          .cookie-popup-content {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
          }
          .cookie-popup p {
            margin-bottom: 10px;
            text-align: center;
          }
          .cookie-popup button {
            background-color: #0070f3;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
          }
        `}</style>
      </div>
    )
  );
};

export default CookiePopup;
