import { createContext, useContext, useReducer } from "react";
import { atencionInitialState, AtencionReducer } from "../reducers/atencionReducer";

export const AtencionStateContext = createContext(atencionInitialState);
export const AtencionDispatchContext = createContext(() => undefined);

export const AtencionProvider = ({ children }) => {
    const [atencion, dispatch] = useReducer(AtencionReducer, atencionInitialState);
    return (
        <AtencionStateContext.Provider value={atencion}>
            <AtencionDispatchContext.Provider value={dispatch}>
                {children}
            </AtencionDispatchContext.Provider>
        </AtencionStateContext.Provider>
    );
};

export const useAtencionState = () => {
    const context = useContext(AtencionStateContext);
    if (context === undefined) {
        throw new Error("useAtencionState must be used within a AtencionProvider");
    }
    return context;
}

export const useAtencionDispatch = () => {
    const context = useContext(AtencionDispatchContext);
    if (context === undefined) {
        throw new Error("useAtencionDispatch must be used within a AtencionProvider");
    }
    return context;
}
