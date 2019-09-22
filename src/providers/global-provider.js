import React, {useState} from 'react';

const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

export const GlobalContext = React.createContext();

export const GlobalProvider = (props) => {
  const [settings, setSettings] = useState([
    {
      isLoaded: true,
      theme: themes,
      activeTheme: 'light'
    }
  ])

  return(
    <GlobalContext.Provider value={[settings, setSettings]}>
      {props.children}
    </GlobalContext.Provider>
  )
}

