import { authenticate, logout, authorityChange } from "./auth";
import produce from 'immer'
import types from "../../types";


export const authInitialState = authenticate();

export const AuthReducer = produce((state = {}, action) => {

    switch (action.type) {
        case types.login:
            state = authenticate(action.token,action.agencia_id);
            return state
        case types.logout:
            state = logout();
            return state
        case types.authorityChange:
            state = authorityChange(state,action.authority);
            return state

        default:
            return state

    }
})
