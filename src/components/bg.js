import React, {useRef, useEffect} from 'react';
import Snake from "./snake";
import Apple from "./apple";
import './main.css'
import {observer} from "mobx-react-lite";
import Square from "../store/square";

const Bg = observer(() => {

    const useInterval = (callback, delay) => {
        const savedCallback = useRef();

        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        useEffect(() => {
            function tick() {
                savedCallback.current();
            }

            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }

    const move = (e) => {
        if (Date.now() - Square.lastTime < Square.speed - 20 || Square.pause === 'PAUSE') {
            if(e.key === 'q'){
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
        if(e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd'){
            Square.lastKey = e.key
        }

        Square.lastTime = Date.now()
        Square.eating()
        Square.checkAppleCoordinate()
    }

    useInterval(() => {
        if (Date.now() - Square.lastTime > Square.speed && Square.pause === '') {
            move({key: Square.lastKey})
        }else{
            //pass
        }
    }, Square.speed)

    return (
        <div>
            <div className="points">{Square.pause} Points: {Square.points} Weight : {Square.apple.weight} Speed:{Square.speedName}</div>
            <div className='bg' tabIndex="0" onKeyDown={e => move(e)} role="button">
                <Apple style={{
                    right: Square.apple.x.toString() + 'px',
                    top: Square.apple.y.toString() + 'px',
                    background: Square.apple.background
                }}/>
                {
                    Square.elems.map(elem =>
                        <Snake key={elem.id} style={{

                            right: elem.x.toString() + 'px',
                            top: elem.y.toString() + 'px',
                        }}/>
                    )
                }
            </div>

        </div>
    )
})

export default Bg;