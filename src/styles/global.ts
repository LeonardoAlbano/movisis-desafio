import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.COLORS.WHITE};
    color: ${({ theme }) => theme.COLORS.BACKGROUND_900};

    -webkit-font-smoothing: antialiased;
    font-family: 'Jost', sans-serif;
  }

  h1 {
    font-size: 42px;
    font-weight: 700;
    color: ${({ theme }) => theme.COLORS.GREEN}; 
  }
  
`;