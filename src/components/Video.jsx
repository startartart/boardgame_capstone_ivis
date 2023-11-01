import * as faceapi from 'face-api.js';
import React, {useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { SendEmotionEvent } from '../events/EmotionSocket'
import { useJokerGameState } from '../contexts/JokerGameContext';

const CanvasContainer = styled.canvas`
  position: absolute;
  top: -100%;
  left: -100%;
  z-index: 1;
`;

const Text = styled.p`
  position: fixed;
  //left top
  top: 0;
  right: 0;
  margin: 0;
`;

const VideoWrapper = styled.video`
  &::-webkit-media-controls-play-button {
    display: none !important;
    -webkit-appearance: none;
  }
`;

function Video(props) {

  const { result } = useJokerGameState();

  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);

  const videoRef = useRef();
  const videoHeight = 0;
  const videoWidth = 0;
  const canvasRef = useRef();

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/models';

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(setModelsLoaded(true));
    }
    loadModels();
    startVideo();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        closeWebcam();
      }
        
    }
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({
         video: { facingMode: "user", width: 0,
          } 
        })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  }

  const handleVideoOnPlay = () => {
    let cnt = 0;

    let maxEmotion = '';
    setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);

        const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        // console.log(detections.expressions);
        if (!detections) {
          maxEmotion = 'error';
        } else {
          maxEmotion = Object.keys(detections.expressions).reduce((a, b) => detections.expressions[a] > detections.expressions[b] ? a : b);
        }

        if (props.level === 1) {
          props.setEmotion(maxEmotion);
        } else if (props.level === 2) {
          if (cnt === 10) {
            closeWebcam();
          }
          props.setCheck(cnt);
          if (maxEmotion !== 'error') {
            cnt++;
          }
        } else if (props.level === 3) {
          let emotion;
          if (detections === undefined) {
            emotion = './images/emoji/emoji0.png';
            props.setCheck(emotion, cnt);
            cnt++;
          } else {
            if (detections.expressions['neutral'] >= 0.99) {
              emotion = "./images/emoji/emoji1.png"; // 무표정
            } else if (detections.expressions['neutral'] >= 0.90) {
              emotion = "./images/emoji/emoji2.png"; // 웃음
            } else if (detections.expressions['neutral'] >= 0.85) {
              emotion = "./images/emoji/emoji3.png"; // 살짝 당황
            } else if (detections.expressions['neutral'] >= 0.10) {
              emotion = "./images/emoji/emoji7.png"; // 입 ㅡ
            } else if (detections.expressions['angry'] >= 0.10) {
              emotion = "./images/emoji/emoji5.png"; // 뭐야
            } else if (detections.expressions['happy'] >= 0.50) {
              emotion = "./images/emoji/emoji8.png"; // 행복해
            } else if (detections.expressions['sad'] >= 0.90) {
              emotion = "./images/emoji/emoji6.png"; // 슬픔
            } else {
              emotion = "./images/emoji/emoji4.png"; // 기타
            }
            props.setCheck(emotion, cnt);
          }
          SendEmotionEvent(emotion);
        } else if (props.level === 4) {
          let emotion;
          if (detections === undefined) {
            emotion = './images/emoji/emoji0.png';
            props.setCheck(emotion, cnt);
            cnt++;
          } else {
            if (detections.expressions['neutral'] >= 0.99) {
              emotion = "./images/emoji/emoji1.png"; // 무표정
            } else if (detections.expressions['neutral'] >= 0.90) {
              emotion = "./images/emoji/emoji2.png"; // 웃음
            } else if (detections.expressions['neutral'] >= 0.85) {
              emotion = "./images/emoji/emoji3.png"; // 살짝 당황
            } else if (detections.expressions['neutral'] >= 0.10) {
              emotion = "./images/emoji/emoji7.png"; // 입 ㅡ
            } else if (detections.expressions['angry'] >= 0.10) {
              emotion = "./images/emoji/emoji5.png"; // 뭐야
            } else if (detections.expressions['happy'] >= 0.50) {
              emotion = "./images/emoji/emoji8.png"; // 행복해
            } else if (detections.expressions['sad'] >= 0.90) {
              emotion = "./images/emoji/emoji6.png"; // 슬픔
            } else {
              emotion = "./images/emoji/emoji4.png"; // 기타
            }
            props.setCheck(emotion, cnt);
          }
          SendEmotionEvent(detections.expressions);
        }
      }
    }, 500)
  }

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  }

  return (
    <>
    {props.level >= 3 ?
      <Text>웹캠 ON</Text> :
        captureVideo && modelsLoaded ?
        props.level === 2 ?
          null :
          <button onClick={closeWebcam}>
            웹캠 닫기
          </button>
          :
          <button onClick={startVideo}>
            웹캠 재작동하기
          </button>
    }
      
      {
        captureVideo ?
          modelsLoaded ?
            <>
                <VideoWrapper ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} autoPlay muted playsInline/>
                <CanvasContainer ref={canvasRef} />
            </>
            :
            <>로딩중 ...</>
          :
          <>
          </>
      }
    </>
  );
}

export default Video;