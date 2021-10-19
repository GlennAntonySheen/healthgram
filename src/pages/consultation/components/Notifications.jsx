import React, { useRef, useContext } from 'react';
import { Button } from '@material-ui/core';

import { SocketContext } from '../Context';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  const myRefname= useRef(null);
  // const myRefname(null);

  if (call.isReceivingCall && !callAccepted) {
    console.log('Receiving call', myRefname.current)
    setTimeout(() => myRefname.current?.click(), 2000)
    
}
  
  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'none', justifyContent: 'space-around' }}>
          <h1>{call.name} is calling:</h1>
          <Button variant="contained" ref={myRefname} color="primary" onClick={answerCall}>
            Answer
          </Button>
          <button onClick={ () => console.log('Receiving call', myRefname.current.click()) }>kkjdhgkjdhgkdjhg</button>
        </div>
      )}
    </>
  );
};

export default Notifications;
