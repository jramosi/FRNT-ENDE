import { createContext, useContext, useReducer } from "react";
import { panelOperadorInitialState, PanelOperadorReducer } from "../reducers/panelOperadorReducer";

export const PanelOperadorStateContext = createContext(panelOperadorInitialState);
export const PanelOperadorDispatchContext = createContext(() => undefined);

export const PanelOperadorProvider = ({ children }) => {
    const [panelOperador, dispatch] = useReducer(PanelOperadorReducer, panelOperadorInitialState);
    return (
        <PanelOperadorStateContext.Provider value={panelOperador}>
            <PanelOperadorDispatchContext.Provider value={dispatch}>
                {children}
            </PanelOperadorDispatchContext.Provider>
        </PanelOperadorStateContext.Provider>
    );
};

export const usePanelOperadorState = () => {
    const context = useContext(PanelOperadorStateContext);
    if (context === undefined) {
        throw new Error("usePanelOperadorState must be used within a PanelOperadorProvider");
    }
    return context;
}

export const usePanelOperadorDispatch = () => {
    const context = useContext(PanelOperadorDispatchContext);
    if (context === undefined) {
        throw new Error("usePanelOperadorDispatch must be used within a PanelOperadorProvider");
    }
    return context;
}
