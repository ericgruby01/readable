/**
 * @constant logger
 * @description Returns a function that will log any changes on the store
 */
const logger = store => next => action => {
    console.group(action.type);
        console.log('The action: ', action);
        const returnValue = next(action);
        console.log('The state: ', store.getState());
    console.groupEnd();
    return returnValue;
}

export default logger;