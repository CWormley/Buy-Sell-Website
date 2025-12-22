/**
 * @file map.js
 * @description Campus map component showing safe meet-up locations.
 * Displays SFSU campus map for users to coordinate in-person transactions.
 * @author Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
 * @version 1.0.0
 */

import React from 'react';

/**
 * Map component - Campus location reference
 * @component
 * @returns {React.ReactElement} Map display with meet-up location info
 */
const Map = () => {
  return (
    <div>
      <div style={{
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h2 style={{
          margin: '2rem 0',
          color: 'black'
        }}>
          Safe Meet-up Locations on Campus
        </h2>
        <img
          src="/Images/map-icon.jpg"
          alt="Full SFSU Map"
          style={{
            maxWidth: '100%',
            borderRadius: '8px'
          }}
        />
      </div>
    </div>
  );
};

export default Map;
