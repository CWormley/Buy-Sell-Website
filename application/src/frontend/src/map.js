/**************************************************************
* Class::  CSC-648 Spring 2025
* Name:: Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
* Group-Name:: Team 02
* Project:: Gator Market
*
* File:: map.js
*
* Description:: 
* Displays a static campus map image showing safe meet-up locations for users.
* Centered title and image layout
* Styled using inline Flexbox for alignment
* 
**************************************************************/     
import React from 'react';

const Map = () => {
    return (
        <div>

            <div style={{padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h2 style={{margin: '2rem 0', color: 'black'}}>Safe Meet-up Locations on Campus </h2>
                <img
                    src="/Images/map-icon.jpg"
                    alt="Full SFSU Map"
                    style={{maxWidth: '100%', borderRadius: '8px'}}
                />
            </div>
        </div>
    );
};

export default Map;
