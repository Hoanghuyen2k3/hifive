
import React, { useEffect, useRef, useCallback } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "./utilities";
import * as fp from "fingerpose";
import { RockGesture, PaperGesture, ScissorsGesture } from './Gestures';

function HumanP({setHum, start}) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const startRef = useRef(start);

  useEffect(() => {
    startRef.current = start;
    console.log(startRef.current);
  }, [start]);

  // const runHandpose = async () => {
  //   const net = await handpose.load();
  //   setInterval(() => {
  //     detect(net);
  //   }, 100);
  // };

  const runHandpose = async () => {
    const net = await handpose.load();
    const detectFrame = () => {
      detect(net);
      requestAnimationFrame(detectFrame);
    };
    detectFrame();
  };
  

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await net.estimateHands(video);
      const knownGestures = [RockGesture, PaperGesture, ScissorsGesture];

      if (startRef.current) {
        console.log(startRef.current);

        if (hand.length > 0) {
          const GE = new fp.GestureEstimator(knownGestures);
          const gesture = await GE.estimate(hand[0].landmarks, 4);

          if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
            const gestureResult = gesture.gestures.reduce((p, c) =>
              p.score > c.score ? p : c
            );
            console.log(gestureResult.name);
            setHum(gestureResult.name);
          }
        }
    
      }

      const ctx = canvasRef.current.getContext('2d');
      drawHand(hand, ctx);
    }
  };

  // runHandpose();

  useEffect(() => {
    let isMounted = true;
  
    const cleanup = () => {
      isMounted = false;
      // Dispose TensorFlow.js models
    };
  
    runHandpose();
  
    return cleanup;
  }, []);
  

  

  return (
    <div className="Human">
      <h2>Human</h2>
      {/* <header className="Human-header"> */}
        <Webcam
          ref={webcamRef}
          className="webcam"
        />

        <canvas
          ref={canvasRef}
          className="canvas"
        />
      {/* </header> */}
    </div>
  );
}

export default HumanP;

