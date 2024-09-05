import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    bird: {
        y: 250,
        rotation: 0,
    }
}


export const birdSlice = createSlice({
    name: "bird", 
    initialState, 
    reducers: {
        fly: (state,action) => {
            state.bird.y -= 50
            state.bird.rotation = -30

        },
        fall: (state,action) => {
            state.bird.y += 20
            state.bird.rotation = 0
        },
        birdReset: (state,action) => {
            state.bird.y = 250
            state.bird.rotation = 0
        }
    }
})

export const {fly, fall, birdReset} = birdSlice.actions

export default birdSlice.reducer