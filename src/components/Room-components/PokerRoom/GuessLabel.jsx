import React from 'react';


const GuessLabel = (props) => {
    return (
        <>
            <img src={props.guess} alt="guess-emoji" />
        </>
    );
}

export default GuessLabel;