import('./modules/monster.js');
import { mArr as monsterArray } from './modules/monster.js';


// cache the DOM
const gridEl = document.getElementById("grid"),
      characterEl = document.getElementById('character'),
      spriteEl = document.getElementById('character_sprite');

// grid settings
let gridSize =  parseInt(window.getComputedStyle(gridEl).width),    
    gridCell = gridSize / 10,
    faceArray = ['face_up', 'face_left', 'face_right'];

// game settings
const WALK_SPEED = gridCell;
export let characterLocation = {x: 0, y: 0};

// functions
const faceDirection = cls => {
    faceArray.forEach(face => spriteEl.classList.remove(face))
    if (cls) spriteEl.classList.add(cls)

    walkDirection(cls)
}

const walkDirection = cls => {    
    switch(cls) {
        case 'face_up':
            characterLocation.y -= WALK_SPEED;
            break
        case 'face_left':
            characterLocation.x -= WALK_SPEED;
            break
        case 'face_right':
            characterLocation.x += WALK_SPEED;
            break
        default :
            characterLocation.y += WALK_SPEED;
    }

    // boundaries
    if (characterLocation.x < 0) characterLocation.x = 0;
    if (characterLocation.x > (gridSize - gridCell)) characterLocation.x = gridSize - gridCell;
    if (characterLocation.y < 0) characterLocation.y = 0;
    if (characterLocation.y > (gridSize - gridCell)) characterLocation.y = gridSize - gridCell;
    
    characterEl.style.top = `${characterLocation.y}px`
    characterEl.style.left = `${characterLocation.x}px`

    monsterArray.forEach(monster => {
        if (monster.x === characterLocation.x && monster.y === characterLocation.y) {
            spriteEl.classList.add('caught')
            window.removeEventListener('keydown', characterMovement);
        }
    })
}

export const characterMovement = e => {
    if(/Arrow/.test(e.key)) spriteEl.classList.add('walking_motion')

    switch(e.key) {
        case 'ArrowUp':
            faceDirection('face_up')
            break
        case 'ArrowDown':
            faceDirection('')
            break
        case 'ArrowLeft':
            faceDirection('face_left')
            break
        case 'ArrowRight':
            faceDirection('face_right')
    }
}

// listeners
window.addEventListener('keydown', characterMovement);
window.addEventListener('keyup', _ => spriteEl.classList.remove('walking_motion'))
