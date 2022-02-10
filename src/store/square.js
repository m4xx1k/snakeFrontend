import {makeAutoObservable} from "mobx";
import uniqid from 'uniqid'
import randomInteger from 'random-int';

class Square {

    constructor() {
        makeAutoObservable(this, {},{autoBind:true})
    }

    elems = [
        {
            id: 1,
            x: 540,
            y: 200,
        },
        {
            id: 2,
            x: 540,
            y: 220,
        },
        {
            id: 3,
            x: 540,
            y: 240,
        },


    ]

    apple = {
        x: randomInteger(1, 29) * 20,
        y: randomInteger(1, 29) * 20,
        background: 'YellowGreen',
        weight: 1,
    }

    start = [
        {
            id: 1,
            x: 540,
            y: 200,
        },
        {
            id: 2,
            x: 540,
            y: 220,
        },
        {
            id: 3,
            x: 540,
            y: 240,
        }
    ]

    randomTypeApple;


    speed = 50
    speedName = 'Slow'
    modSpeed= 0

    points = 3;

    pause = ''

    checkX;
    checkY;

    currentX;
    currentY;

    lastKey = 'w';
    lastTime = Date.now();
    lastX;
    lastY;

    newArr;



    changePause(){
        if(this.pause === 'PAUSE'){
            this.pause = ''
        }else{
            this.pause = 'PAUSE'
        }
    }



    eating() {
        if (this.elems[0].x === this.apple.x && this.elems[0].y === this.apple.y) {
            this.apple.x = randomInteger(1, 29) * 20
            this.apple.y = randomInteger(1, 29) * 20
            this.elems.push({id: uniqid(), x: this.lastX, y: this.lastY})
            this.points = this.points + this.apple.weight

            this.randomTypeApple = randomInteger(1,8)
            if(this.randomTypeApple%3===0){
                this.apple.weight = 5
                this.apple.background = 'Gold'
            }
            if(this.randomTypeApple === 7){
                this.apple.weight = 10
                this.apple.background = 'indigo'
            }
            if(this.randomTypeApple%2===0 || this.randomTypeApple ===1 || this.randomTypeApple ===5){
                this.apple.weight = 1
                this.apple.background = 'GreenYellow'
            }
            this.speedUp()
        }
    }

    speedUp(){
        if(Math.floor(this.points/50)>this.modSpeed && this.speed>50){
            this.modSpeed = this.modSpeed + 1
            this.speed = this.speed - 50
            switch(this.speed){
                case 150:
                    this.speedName = 'Fast'
                    break;
                case 100:
                    this.speedName = "Faster"
                    break;
                case 50:
                    this.speedName = "The Fastest"
                    break;
            }
            console.log(this.points/50,this.modSpeed)
        }
    }

    checkAppleCoordinate() {
        this.elems.forEach(elem => {
            if (elem.x === this.apple.x && elem.y === this.apple.y) {
                this.apple.x = randomInteger(1, 29) * 20
                this.apple.y = randomInteger(1, 29) * 20
            }
        })
    }

    checkCoordinate() {

        //check if snake eating itself
        this.elems.forEach((elem, i) => {
            this.currentX = this.elems[0].x
            this.currentY = this.elems[0].y
            if (elem.x === this.currentX && elem.y === this.currentY && i) {
                this.elems = this.start
                this.points = 3
                this.lastKey = 'w'
            }
        })

        //checking border
        this.checkX = this.elems[0].x === 600 || this.elems[0].x === -20
        this.checkY = this.elems[0].y === 600 || this.elems[0].y === -20

        if (this.checkY || this.checkX) {
            this.elems = this.start
            this.points = 3
        }


    }

    moveTop() {
        this.newArr = []
        this.elems.forEach((elem, i) => {
            if (!i) {
                this.newArr.push({...elem, y: elem.y - 20})
                this.lastY = elem.y
                this.lastX = elem.x

            } else {
                this.newArr.push({...elem, x: this.lastX, y: this.lastY})
                this.lastY = elem.y
                this.lastX = elem.x
            }
        })
        this.elems = this.newArr
    }

    moveBottom() {
        this.newArr = []
        this.elems.forEach((elem, i) => {
            if (!i) {
                this.newArr.push({...elem, y: elem.y + 20})
                this.lastY = elem.y
                this.lastX = elem.x
            } else {
                this.newArr.push({...elem, x: this.lastX, y: this.lastY})
                this.lastY = elem.y
                this.lastX = elem.x
            }
        })
        this.elems = this.newArr
    }

    moveRight() {
        this.newArr = []
        this.elems.forEach((elem, i) => {
            if (!i) {
                this.newArr.push({...elem, x: elem.x - 20})
                this.lastX = elem.x
                this.lastY = elem.y
            } else {
                this.newArr.push({...elem, y: this.lastY, x: this.lastX})
                this.lastX = elem.x
                this.lastY = elem.y
            }
        })
        this.elems = this.newArr
    }

    moveLeft() {
        this.newArr = []
        this.elems.forEach((elem, i) => {
            if (!i) {
                this.newArr.push({...elem, x: elem.x + 20})
                this.lastX = elem.x
                this.lastY = elem.y
            } else {
                this.newArr.push({...elem, y: this.lastY, x: this.lastX})
                this.lastX = elem.x
                this.lastY = elem.y
            }
        })
        this.elems = this.newArr
    }

}

export default new Square();