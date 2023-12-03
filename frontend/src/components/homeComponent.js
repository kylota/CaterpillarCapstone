import React from 'react';
//What can we add that will remember their auth status? 
//import { Link, useNavigate } from 'react-router-dom';
import '../css/index.css';
import * as PIXI from 'pixi.js';



function Home() {
    // Your PixiJS code goes here
    const app = new PIXI.Application({ width: 20, height: 20 });
    document.body.appendChild(app.view);

    // Create a red square
    const square = new PIXI.Graphics();
    square.beginFill(0xFF0000);
    square.drawRect(0, 0, 100, 100);
    square.endFill();
    app.stage.addChild(square);
    return (
        <div>
         <img src="https://cdn.pixabay.com/photo/2018/01/02/18/51/laptop-3056847_1280.jpg" className="img" alt="in progress" />
    </div>
    );
}

export default Home