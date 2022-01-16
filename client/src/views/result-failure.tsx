import {
    ChakraProvider,
    Box,
    Text,
    VStack,
    Grid,
    theme,
    Button,
    Image,
  } from "@chakra-ui/react"
import { useState } from "react";
import { ColorModeSwitcher } from "../ColorModeSwitcher"
import { MovieEntry } from "../components/movie-entry";
import { View } from "../constants";

export const ResultFailure = ({ setView }: { setView: (view: View) => void }) => {
    const [isDisabled, setDisabled] = useState(false);
    const [selected, setSelected] = useState(-1);
    const movies = [{name: 'Shrek 3', id: 1}, {name: 'Shrek 1', id: 4}, {name: 'Shrek 2', id: 55}, {name: 'Shrek 4', id: 12}, {name: 'Shrek 5', id: 68}];

    const handleConfirm = () => {
      // TODO pass on confirmed movie to context provider
      setView(View.READY_TO_WATCH);
    }

    const updateSelected = (movie: number) => {
      if (selected === movie) {
        setSelected(-1);
      } else {
        setSelected(movie);
      }
    }

    return (
      <ChakraProvider theme={theme}>
        <Box fontSize="xl">
          <Grid p={5}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <VStack spacing={1}>
              <Text 
                fontWeight='bold'
                fontSize="4xl"
                textAlign='center'
              >
                Your group's top 5 picks:
              </Text>
              <Box 
                width='100%'
                maxHeight='70%'
                overflow='scroll'
                paddingBottom='20px'
              >
                {
                  movies.map(movie => {
                    return <MovieEntry 
                      text={movie.name} 
                      onSelect={() => updateSelected(movie.id)}
                      onOpen={() => setView(View.LANDING)} // TODO movie info screen
                      selected={selected === movie.id}/>
                  })
                }
                
              </Box>
              <Button colorScheme={'purple'} size='md' width='80%' isDisabled={isDisabled} onClick={handleConfirm}>Confirm movie</Button>
            </VStack>
          </Grid>
        </Box>
      </ChakraProvider>
    )
}