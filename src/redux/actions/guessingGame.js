export const UPDATE_GUESSES = "update_guesses";
export const UPDATE_Temperature = "update_temperature";
export const UPDATE_Cities = "update_cities";

export const updateGuesses = function (arr) {
    return {
        type: UPDATE_GUESSES,
        payload: arr,
    };
};

export const updateTemperature = function (arr) {
    return {
        type: UPDATE_Temperature,
        payload: arr,
    };
};

export const updateCities = function (arr) {
    return {
        type: UPDATE_Cities,
        payload: arr,
    };
};