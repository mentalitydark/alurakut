import { createGlobalStyle, ThemeProvider } from 'styled-components'
import {AlurakutStyles} from '../src/lib/AlurakutCommons';

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
  }
  body {
    background-color: #787878;
    font-family: sans-serif;
    background-image: url('https://criticalhits.com.br/wp-content/uploads/2020/12/cb109d5d1402ae804422a89aa168da00.jpg');
    background-position: center;
    background-repeat: repeat;
    background-size: cover;
  }
  #__next {
    height: 100vh;
  }
  img {
    max-width:100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
