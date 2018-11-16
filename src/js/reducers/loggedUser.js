import { consts } from '../actions/loggedUser';

const INITIAL_STATE = '';

export default function loggedUser (state = INITIAL_STATE, action) {
    switch(action.type) {
        case consts.SET_USER:
            return action.user;
        default:
            return state;
    }
}