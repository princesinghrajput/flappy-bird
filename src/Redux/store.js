 import { configureStore } from "@reduxjs/toolkit";
import birdReducer from "./birdReducer";
 import gameReducer from './gameReducer'
import pipeReducer from "./pipeReducer";


 export const store = configureStore({
    reducer: {
        game: gameReducer,
        bird: birdReducer,
        pipe: pipeReducer
    }
 })