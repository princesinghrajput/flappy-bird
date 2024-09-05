import React, { useEffect, useRef, useState } from 'react'
import Bird from './Bird'
import ForeGround from './ForeGround'
import Pipe from './Pipe'
import { useDispatch, useSelector } from 'react-redux'
import { addScore, gameOver, start } from '../Redux/gameReducer'
import { fly, fall, birdReset } from '../Redux/birdReducer'
import { generatePipe, pipeReset, pipeRun} from '../Redux/pipeReducer'

let gameLoop
let pipeGenerator




export default function Game() {
    
    const dispatch = useDispatch()
    const { game } = useSelector((state) => state.game)
    
    const { bird } = useSelector((state) => state.bird)
    const { pipes, startPosition } = useSelector((state) => state.pipe)
    const wingRef = useRef(null)
    const hitRef = useRef(null)
    const pointRef = useRef(null)


      

    function startGameLoop() {
        gameLoop = setInterval(() => {


            dispatch(fall())
            dispatch(pipeRun())

            
        }, 150)
        
        pipeGenerator = setInterval(() => {
            dispatch(generatePipe()) 

            dispatch(addScore())
            pointRef.current.play()

       }, 3000)


    }

    function stopGameLoop() {
        clearInterval(gameLoop)
        clearInterval(pipeGenerator)
    }



    const handleClick = (e) => {

        if(game.status === 'PLAYING'){
            dispatch(fly())

        }

    }

    const newGameHandler = () => {
        startGameLoop()
        dispatch(start())

    }



    useEffect(() => {


        if(game.status === 'GAME_OVER'){
            stopGameLoop()
        }
        else{
            const x = startPosition.x

            const challenge = pipes
              .map(({height}, i) => {

                return {
                  x1: x + i * 200,
                  y1: height,
                  x2: x + i * 200,
                  y2: height + 100,
                }
              })
              .filter(({x1}) => {
                if (x1 > 0 && x1 < 288) {
                  return true
                }
              })

            if (bird.y > 512 - 108) {
                
              dispatch(gameOver())
              dispatch(birdReset())
              dispatch(pipeReset())
              hitRef.current.play()
            }
          
            if (challenge.length) {
              const {x1, y1, x2, y2} = challenge[0]
          
              if (
                (x1 < 150 && 150 < x1 + 52 && bird.y < y1) ||
                (x2 < 150 && 150 < x2 + 52 && bird.y > y2)
              ) {
                hitRef.current.play()
                dispatch(gameOver())
                dispatch(birdReset())
                dispatch(pipeReset())
              }
            }
        }

    },[startPosition.x])

  return (
    <div className='game-div' onClick={handleClick}>
        <audio ref={hitRef} src="./hit.mp3"></audio>
        <audio ref={pointRef} src="./point.mp3"></audio>
        {game.status === 'NEW_GAME' &&(
          <>
            <img className='start-btn' src="./start-button.png" onClick={newGameHandler} alt="" />
            <Bird />
          </>
        )
        }
        {game.status === 'GAME_OVER' && (
            <>
                <img className='start-btn' src="./start-button.png" onClick={newGameHandler} alt="" />
                <h2 style={{position: 'absolute', top: 100, left: 80}}>Game Over</h2>  
                <h2 style={{position: 'absolute', top: 150, left: 140}}>{game.score}</h2>  
            </>
        )
    }
        { game.status === 'PLAYING' &&
            (<>
            <audio ref={wingRef} src="./wing.mp3"></audio>
            <Bird />
    
            <Pipe  />
            <ForeGround/>
              <h2 style={{position: 'absolute', top: 50, left: 150}}>{game.score}</h2>  
            
            </>
            )
        }

    </div>
  )
}
