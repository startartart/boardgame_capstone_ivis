import React, { useEffect, useRef } from "react";

function Camera() {
  const videoRef = useRef(null);

  useEffect(() => {
    const constraints = { video: true };
    const video = videoRef.current;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
          if (video) {
            video.srcObject = stream;
          }
        })
        .catch(err => {
          console.error("Error getting user media", err);
        });
    }
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay={true} />
    </div>
  );
}

export default Camera;