import React, { SyntheticEvent, useState } from "react"
import { createBreakpoints } from '@chakra-ui/theme-tools';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Input,
  Grid,
  theme,
  Button,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import { LandingPage } from "./views/landing-page";
import { MainProvider } from "./context/main"
import { UsersProvider } from "./context/users"
import { SocketProvider } from "./context/socket"

const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
})

export const App = () => (
  <ChakraProvider theme={theme}>
    <MainProvider>
      <UsersProvider>
        <SocketProvider>
          <LandingPage/>
        </SocketProvider>
      </UsersProvider>
    </MainProvider>
    
  </ChakraProvider>
)
