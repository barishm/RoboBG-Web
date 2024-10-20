import { createSlice } from "@reduxjs/toolkit"

const compareSlice = createSlice({
    name: 'compare',
    initialState: {
        robots:[]
    },
    reducers: {
        addRobot: (state, action) => {
            const existingRobot = state.robots.find(robot => robot.id === action.payload.id);
            if(!existingRobot) {
                return {
                    ...state,
                    robots: [...state.robots, action.payload]
                };
            }
        },
        deleteRobotById: (state, action) => {
            const idToDelete = action.payload;
            state.robots = state.robots.filter(robot => robot.id !== idToDelete);
        },
        deleteAllRobots: (state) => {
            state.robots = [];
        },
    }
})
export const { addRobot, deleteRobotById,deleteAllRobots } = compareSlice.actions
export default compareSlice.reducer