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
import { LandingPage } from "./views/LandingPage";

const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
})

export const App = () => { 
  
    return (<LandingPage/>)
  // const [view, setView] = useState(0);
  // var render;
  // switch (view) {
  //   case 0: render=<LandingPage/>
  // }
  // return (render)
}
