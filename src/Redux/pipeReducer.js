import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    startPosition: {
        x: 310
    },
    pipes: [{
        height: 200
    }]

}


export const pipeSlice = createSlice({
    name: "pipe", 
    initialState, 
    reducers: {
        pipeRun: (state,action) => {
            if (!state.pipes.length) {
                return 
              }
            state.startPosition.x -= 10
        },
        generatePipe: (state, action) => {
            const randomPipeHeight = Math.round(Math.random() *200) +50

            state.pipes = [...state.pipes, {height: randomPipeHeight}]
 
        },
        pipeReset: (state,action) => {
            state.startPosition.x = 310
            state.pipes = [{
                height: 200
            }]
        },

        
    }
})

export const {pipeRun, generatePipe, pipeReset} = pipeSlice.actions

export default pipeSlice.reducer