import {useState} from 'react'
import { createBreakpoints } from '@chakra-ui/theme-tools';

import { LandingPage } from "./views/landing-page";
import { CreateGroupStepOne } from './views/create-group-step-one';
import { CreateGroupStepTwo } from './views/create-group-step-two';
import { GroupStart } from './views/group-start';
import { MainProvider } from "./context/main"
import { UsersProvider } from "./context/users"
import { SocketProvider } from "./context/socket"
import { View } from './constants';
import { ResultSuccess } from './views/result-success';
import { ReadyToWatch } from './views/ready-to-watch';
import { ResultFailure } from './views/result-failure';
import { MovieVoteResults } from './views/movie-vote-results';

const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
})

export const App = () => { 
  const [view, setView] = useState(0);
  // const [view, setView] = useState(View.MOVIE_VOTE_RESULTS);
  const getView = () => {
    switch (view) {
      case View.CREATE_GROUP_STEP_ONE:
        return <CreateGroupStepOne setView={setView}/>
      case View.CREATE_GROUP_STEP_TWO:
        return <CreateGroupStepTwo setView={setView}/>
      case View.GROUP_START:
        return <GroupStart setView={setView}/>
      case View.RESULT_SUCCESS:
        return <ResultSuccess setView={setView}/>
      case View.RESULT_FAILURE:
        return <ResultFailure setView={setView}/>
      case View.READY_TO_WATCH:
        return <ReadyToWatch setView={setView}/>
      case View.MOVIE_VOTE_RESULTS:
        return <MovieVoteResults setView={setView}/>
      case View.LANDING:
      default:
        return <LandingPage setView={setView}/>
    }
  }

  return (
    <MainProvider>
      <UsersProvider>
        <SocketProvider>
          {getView()}
        </SocketProvider>
      </UsersProvider>
    </MainProvider>
  )
};
