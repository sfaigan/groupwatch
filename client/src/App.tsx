import {useState} from 'react'
import { createBreakpoints } from '@chakra-ui/theme-tools';

import { CreateGroupScreenOne } from './views/create-group-screen-1';
import { LandingPage } from "./views/landing-page";
import { CreateGroupScreenTwo } from './views/create-group-screen-2';
import { GroupListScreen } from './views/group list screen';
import { MainProvider } from "./context/main"
import { UsersProvider } from "./context/users"
import { SocketProvider } from "./context/socket"

const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
})

export const App = () => { 
  const [view, setView] = useState(0);
  var render;
  if (view === 0) {
    render = <LandingPage callback={setView}/>
  } else if (view === 1) {
    render = <CreateGroupScreenOne callback={setView}/>
  } else if (view === 2) {
    render = <CreateGroupScreenTwo callback={setView}/>
  } else if (view === 3) {
    render = <GroupListScreen callback={setView}/>
  } else {
    render = <LandingPage callback={setView}/>
  }

  return (
    <MainProvider>
      <UsersProvider>
        <SocketProvider>
          (render)
        </SocketProvider>
      </UsersProvider>
    </MainProvider>
  )
};
