// consts
export const consts = {
    SET_USER: 'SET_USER'
}

// Actions
export const actions = {
    /**
     * @function setUser
     * @description Action | Set the logged user
     */
    setUser: user => ({type: consts.SET_USER, user})
}