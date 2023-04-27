import React, { useReducer, createContext, useContext } from 'react';

const initialThemeState = {
    mode: 4,
    primaryColor : "#563232", // Main color / darker
    secondaryColor : "#ffc18c", // Main color / lighter
    thirdColor : "#84240c", // Font color / darker
    fourthColor : "#da6d42", // Font color / lighter
    fifthColor : "#e7cfb4", // Border color
    unselectedColor : "#383838", // unselected color

    fontColor : "#FFFFFF",
    darkColor: "#000000",
    backgroundImage: "./background/background_4.png",
    auto: false,
};

const themeReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_THEME_1':
            return {
                mode: 1,
                primaryColor : "#840029",
                secondaryColor : "#f64d52",
                thirdColor : "#a91834",
                fourthColor : "#fddac3",
                fifthColor : "#fa8989",
                unselectedColor : "#383838",

                fontColor : "#FFFFFF",
                darkColor: "#000000",
                backgroundImage: "./background/background_1.png",
            }
        case 'CHANGE_THEME_2':
            return {
                mode: 2,
                primaryColor : "#79818a",
                secondaryColor : "#e1e1e4",
                thirdColor : "#9c969a",
                fourthColor : "#9c747c",
                fifthColor : "#f4edeb",
                unselectedColor : "#5c5c5c",

                fontColor : "#FFFFFF",
                darkColor: "#000000",
                backgroundImage: "./background/background_2.png",
            }
        case 'CHANGE_THEME_3':
            return {
                mode: 3,
                primaryColor : "#3a8a59",
                secondaryColor : "#2bb96b",
                thirdColor : "#43c472",
                fourthColor : "#2fde7c",
                fifthColor : "#35f78a",
                unselectedColor : "#5c5c5c",

                fontColor : "#FFFFFF",
                darkColor: "#000000",
                backgroundImage: "./background/background_3.png",
            }
        case 'CHANGE_THEME_4':
            return {
                mode: 4,
                primaryColor : "#563232",
                secondaryColor : "#ffc18c",
                thirdColor : "#84240c",
                fourthColor : "#da6d42",
                fifthColor : "#e7cfb4",
                unselectedColor : "#383838",

                fontColor : "#FFFFFF",
                darkColor: "#000000",
                backgroundImage: "./background/background_4.png",
            }
        case 'AUTO':
            return {
                ...state,
                auto: true,
            }
        default:
            return state;
    }
};

const ThemeStateContext = createContext();
const ThemeDispatchContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, dispatch] = useReducer(themeReducer, initialThemeState);

    return (
        <ThemeStateContext.Provider value={theme}>
            <ThemeDispatchContext.Provider value={dispatch}>
                {children}
            </ThemeDispatchContext.Provider>
        </ThemeStateContext.Provider>
    )
};

export const useThemeState = () => {
    const context = useContext(ThemeStateContext);
    if (!context) {
        throw new Error('Cannot find ThemeProvider');
    }
    return context;
};

export const useThemeDispatch = () => {
    const context = useContext(ThemeDispatchContext);
    if (!context) {
        throw new Error('Cannot find ThemeProvider');
    }
    return context;
};

export const useTheme = () => {
    return [useThemeState(), useThemeDispatch()];
};

