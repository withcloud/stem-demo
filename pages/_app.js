import React from 'react'
import { ThemeProvider, ColorModeProvider } from '@chakra-ui/core'
import theme from 'lib/theme'

function MyApp ({ Component, pageProps, err }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ColorModeProvider value='light'>
          <Component {...pageProps} err={err} />
        </ColorModeProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
