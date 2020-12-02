import { characterLocation, characterMovement } from '../script.js';

// cache the DOM
const gridEl = document.getElementById("grid"),
      spriteEl = document.getElementById('character_sprite'),
      monsterEl = document.getElementById("monster");

// grid settings
let gridSize =  parseInt(window.getComputedStyle(gridEl).width),    
    gridCell = gridSize / 10;

// game settings
export const MONSTER_SPEED = 1,
      MONSTER_COUNT = 5; // 5 max for now...

// class
class Monster {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.dx = -gridCell;
        this.dy = -gridCell;
        this.id = id;
    }

    create() {
        let monster = document.createElement('div');
        monster.id = this.id;
        monster.classList.add('monster');
        gridEl.append(monster);
    }

    behavior() {

        if (this.x != characterLocation.x) {
            this.dx = this.x > characterLocation.x ? 
                    - Math.abs(this.dx)
                    : Math.abs(this.dx);
        
            this.x += this.dx;
            document.getElementById(this.id).style.left = this.x + "px";
        }
           
        if (this.y != characterLocation.y) {
            this.dy = this.y > characterLocation.y ? 
                    - Math.abs(this.dy)
                    : Math.abs(this.dy);
        
            this.y += this.dy;
            document.getElementById(this.id).style.top = this.y + "px";
        }
    }

    activate() {
        this.create()
        document.getElementById(this.id).style.left = this.x + "px";
        document.getElementById(this.id).style.top = this.y + "px";
     
        let timer = setInterval(cell => {
             // boundaries
             if ((this.x - gridCell) < 0 || this.x > (gridSize - gridCell * 2)) 
                this.dx = -this.dx;
             
             if ((this.y - gridCell) < 0 || this.y > (gridSize - gridCell * 2)) 
                this.dy = -this.dy;
     
             this.behavior()
              
             // if caught
             if (this.x === characterLocation.x && this.y == characterLocation.y) {
             clearInterval(timer);
             spriteEl.classList.add('caught')
             window.removeEventListener('keydown', characterMovement);
             console.log('you died...')
             }
         }, 1000 / MONSTER_SPEED)
     }
}








// generate monsters
export let mArr = [];

const monsterGenerator = num => {
    for (let i = 0; i < num; i++) {
        let monster = new Monster(540 - 60 * (i * 2), 540, `monster${i}`);
        mArr.push(monster);
    }

    mArr.forEach(monster => monster.activate());
}

monsterGenerator(MONSTER_COUNT);



// monster collision
// constant check in realtime
// animation loop




let collision = setInterval(_ => {
    mArr.forEach((monster, index, arr) => {
       if (arr[index + 1]) {
           let other = arr[index + 1];

           if (monster.x === other.x && monster.y === other.y) {
               monster.x = 600;
               monster.y = 600;
               other.x = 0;
               other.y = 600;   
           }
       }
    })
}, 1)