import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/global'

import theme from './styles/theme'

import { Details } from "./pages/Details"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <GlobalStyles />
      <BrowserRouter>
        <Details />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
