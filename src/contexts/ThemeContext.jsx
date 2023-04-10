import React, { useReducer, createContext, useContext } from 'react';

const initialThemeState = {
    mode: 4,
    primaryColor : "#840084",
    secondaryColor : "#990099",
    thirdColor : "#AD00AD",
    fourthColor : "#C100C1",
    fifthColor : "#D600D6",
    fontColor : "#FFFFFF",
    darkColor: "#000000",
    auto: false,
};

const themeReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_THEME_1':
            return {
                mode: 1,
                primaryColor : "#840000",
                secondaryColor : "#990000",
                thirdColor : "#AD0000",
                fourthColor : "#C10000",
                fifthColor : "#D60000",

                fontColor : "#FFFFFF",
                darkColor: "#000000",
            }
        case 'CHANGE_THEME_2':
            return {
                mode: 2,
                primaryColor : "#000084",
                secondaryColor : "#000099",
                thirdColor : "#0000AD",
                fourthColor : "#0000C1",
                fifthColor : "#0000D6",

                fontColor : "#FFFFFF",
                darkColor: "#000000",
            }
        case 'CHANGE_THEME_3':
            return {
                mode: 3,
                primaryColor : "#008400",
                secondaryColor : "#009900",
                thirdColor : "#00AD00",
                fourthColor : "#00C100",
                fifthColor : "#00D600",

                fontColor : "#FFFFFF",
                darkColor: "#000000",
            }
        case 'CHANGE_THEME_4':
            return {
                mode: 4,
                primaryColor : "#840084",
                secondaryColor : "#990099",
                thirdColor : "#AD00AD",
                fourthColor : "#C100C1",
                fifthColor : "#D600D6",

                fontColor : "#FFFFFF",
                darkColor: "#000000",
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

