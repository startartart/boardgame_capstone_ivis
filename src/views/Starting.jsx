import React, { useState, useEffect } from 'react';

const Starting = () => {

    const [actions, setActions] = useState(0);

    const onMoveLayout = (action) => {
        if (action === 1) {
            setActions(1);
        }
        else if (action === 2) {
            setActions(2);
        }
        else if (action === 3) {
            setActions(3);
        }
    }

    const layoutChange = () => {
        setActions(0);
    }

    return (
        <>
        {actions === 0 && 
            <>
                <h1>Com vs User</h1>
                <button onClick={() => onMoveLayout(1)}>Start</button>

                <h1>User vs User(near)</h1>
                <button onClick={() => onMoveLayout(2)}>Start</button>

                <h1>User vs User(free)</h1>
                <button onClick={() => onMoveLayout(3)}>Start</button>
            </>
        }
        </>

    )
}

export default Starting;