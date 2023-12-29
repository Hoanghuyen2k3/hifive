// 1. Install dependencies DONE
// 2. Import dependencies DONE
// 3. Setup webcam and canvas DONE
// 4. Define references to those DONE
// 5. Load handpose DONE
// 6. Detect function DONE
// 7. Drawing utilities DONE
// 8. Draw functions DONE

import React, { useRef } from "react";
// import logo from './logo.svg';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
// import "./App.css";
import { drawHand } from "./utilities";
import * as fp from "fingerpose";
import { RockGesture, PaperGesture, ScissorsGesture } from './Gestures';

function RockPapperScissors() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runHandpose = async () => {
    const net = await handpose.load();
    // console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video);
    //   console.log(hand);
      const knownGestures = [RockGesture, PaperGesture, ScissorsGesture];

      ///////// NEW STUFF ADDED GESTURE HANDLING

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator(knownGestures);
        const gesture = await GE.estimate(hand[0].landmarks, 4);
        // console.log(gesture);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
            
          console.log(gesture.gestures);

        //   const confidence = gesture.gestures.map(
        //     (prediction) => prediction.confidence
        //   );
        //   const maxConfidence = confidence.indexOf(
        //     Math.max.apply(null, confidence)
        //   );
        //   console.log(maxConfidence);
        //   console.log(gesture.gestures);
        //   console.log(emoji);
            const gestureResult = gesture.gestures.reduce((p, c) => { 
                return (p.score > c.score) ? p : c;});
            console.log(gestureResult.name);

        }
      }

      ///////// NEW STUFF ADDED GESTURE HANDLING
    

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  runHandpose();

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default RockPapperScissors;

