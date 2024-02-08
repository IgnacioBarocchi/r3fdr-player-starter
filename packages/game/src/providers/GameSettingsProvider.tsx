import { FC, ReactNode, createContext, useContext, useReducer } from "react";

type UPDATE_GRAPHICSAction = {
  type: "UPDATE_GRAPHICS";
  payload: "LOW" | "NORMAL" | "HIGH";
};

type Action = UPDATE_GRAPHICSAction;

type Dispatch = (val: Action) => void;

const { DEV } = import.meta.env;

const defaultConfig = {
  USE_FULL_SCREEN: !DEV,
  MONITOR_PERFORMANCE: DEV,
  USE_ORBIT_CONTROLS: DEV,
  USE_SCENE_LIGHTS: !DEV,
  DEBUG_APP: DEV,
  GRAPHICS: DEV ? "LOW" : "NORMAL",
  USING_MOBILE_DEVICE: window.innerWidth <= 768,
};

interface State {
  USE_FULL_SCREEN: boolean;
  MONITOR_PERFORMANCE: boolean;
  USE_ORBIT_CONTROLS: boolean;
  USE_SCENE_LIGHTS: boolean;
  DEBUG_APP: boolean;
  GRAPHICS: string;
  USING_MOBILE_DEVICE: boolean;
}

const AppContext = createContext<{
  state: State;
  dispatch: Dispatch;
}>({
  state: {
    ...defaultConfig,
  },
  dispatch: () => null,
});

const UPDATE_GRAPHICS = "UPDATE_GRAPHICS";

const appConfigReducer = (state: any, action: { type: any; payload: any }) => {
  switch (action.type) {
    case UPDATE_GRAPHICS:
      return { ...state, GRAPHICS: action.payload };
    default:
      return state;
  }
};

const GameSettingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appConfigReducer, defaultConfig);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useGameSettings = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppConfig must be used within an AppProvider");
  }
  return context;
};

export { AppContext, GameSettingsProvider, useGameSettings, UPDATE_GRAPHICS };
