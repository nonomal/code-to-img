import { createContext, ReactNode, useContext } from "react";
import { gradients } from "../data/gradients";
import { useLocalStorage } from "../hooks/useLocalStorage";

export type FontSize = "12px" | "14px" | "16px" | "18px" | "20px" | "24px";
export type PaddingSize = "sm" | "md" | "lg" | "xl" | "2xl";
export type Language =
  | "auto"
  | "javascript"
  | "typescript"
  | "python"
  | "go"
  | "rust";

export type EditorSettings = {
  title: string;
  code: string;
  darkMode: boolean;
  dropShadow: boolean;
  showTitle: boolean;
  fontSize: string;
  padding: string;
  language: string;
  backgroundColor?: string;
  backgroundImage?: string;
  showLineNumber: boolean;
  renderScale: string;
  renderFormat: string;
};

export type EditorContextType = {
  settings: EditorSettings;
  setSettings: (newState: EditorSettings) => void;
};
export const EditorContext = createContext<EditorContextType | null>(null);

const DEFAULT_JS_VALUE = `import React from "react";

const App = () => {
  return (
    <div>Hello, World!</div>
  )
}

export default App;`;
const defaultSettings: EditorSettings = {
  darkMode: true,
  dropShadow: true,
  showTitle: true,
  showLineNumber: true,
  fontSize: "16px",
  language: "javascript",
  padding: "md",
  title: "App.tsx",
  code: DEFAULT_JS_VALUE,
  backgroundImage: gradients[0].gradient,
  backgroundColor: gradients[0].color,
  renderScale: "1x",
  renderFormat: "PNG",
};

export const EditorProvider = ({
  children,
  settings: initalSettings,
}: {
  children: ReactNode;
  settings?: EditorSettings;
}) => {
  const [settings, setSettings] = useLocalStorage<EditorSettings>({
    key: "editor-settings",
    value: initalSettings ? initalSettings : defaultSettings,
  });

  return (
    <EditorContext.Provider
      value={{
        settings,
        setSettings,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw "Editor context is not initialized!";
  }
  return context;
};
