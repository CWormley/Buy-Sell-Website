import React from 'react';

const Map = () => {
    return (
        <div>
            <header>
                <h1>Gator Market</h1>
            </header>

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
