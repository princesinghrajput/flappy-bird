import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


export default function Bird(props) {


    const {bird} = useSelector((state) => state.bird)
    
  return (
    <div ref={props.birdRef} className='bird' style={ { 
      top: bird.y,
      transform: `rotate(${bird.rotation}deg)`,
      }}>
        <img src="./bird.png" alt="" />
    </div>
  )
}
