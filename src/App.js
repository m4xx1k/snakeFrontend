import './App.css'
import Square from "./store/square";
import {observer} from "mobx-react-lite";
import React from "react";
import useInterval from "./useInterval";

const App = observer(() => {

    const move = (e) => {
        if (Date.now() - Square.lastTime < Square.speed - 50 || Square.pause === 'PAUSE') {
            if (e.key === 'q') {
                Square.changePause()
            }

        } else {
            switch (e.key) {

                case('w'):
                    Square.moveTop()
                    break;
                case('s'):
                    Square.moveBottom()
                    break;
                case('a'):
                    Square.moveLeft()
                    break;
                case('d'):
                    Square.moveRight()
                    break;
                case('q'):
                    Square.changePause()
                    break;
                default:
                    break;
            }
        }
        Square.checkCoordinate();

        //check if lastKey was coordinate key
        if (e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd') {
            Square.lastKey = e.key
        }

        Square.lastTime = Date.now()
        Square.eating()
        Square.checkAppleCoordinate()
    }

    useInterval(() => {
        if (Date.now() - Square.lastTime > Square.speed && Square.pause === '') {
            move({key: Square.lastKey})
        } else {
            //pass
        }
    }, Square.speed)

    return (
        <div className="App">
            <div className="gameInfo">
                <div>{Square.pause}</div>
                <div>Points: {Square.points} </div>
                <div>Feed Weight : {Square.apple.weight}</div>
                <div>Speed:{Square.speedName}</div>
            </div>

            <div className='gameSpace' tabIndex="0" onKeyDown={e => move(e)} role="button">
                <div className="apple" style={{
                    right: Square.apple.x.toString() + 'px',
                    top: Square.apple.y.toString() + 'px',
                    background: Square.apple.background
                }}> </div>
                {
                    Square.elems.map(elem =>
                        <div className="snake" key={elem.id} style={{

                            right: elem.x.toString() + 'px',
                            top: elem.y.toString() + 'px',
                        }}> </div>
                    )
                }
            </div>

            <div className="rules">
                <div className="movement">
                    <div>MOVEMENT BY WASD</div>
                    <div className="start">To Start - Click Left Mouse Button On Black Area</div>
                    <div>Also, change the keyboard layout to English</div>
                    <div className="pause">PAUSE - PRESS Q</div>
                </div>
                <div className="feed">
                    Types of Feed:
                    <div className="feed-item">
                        <div className="feed-appearance feed-appearance1"> </div>
                        <div className="feed-item__text"> is 1 Point</div>
                    </div>
                    <div className="feed-item">
                        <div className="feed-appearance feed-appearance2"> </div>
                        <div className="feed-item__text"> is 5 Point</div>
                    </div>
                    <div className="feed-item">
                        <div className="feed-appearance feed-appearance3"> </div>
                        <div className="feed-item__text"> is 10 Point</div>
                    </div>
                </div>
                <div className="speed">
                    Every 50 point snake's speed is increase
                </div>
                <div>GOOD LUCK :з</div>
            </div>
        </div>
    )
        ;
})

export default App;
