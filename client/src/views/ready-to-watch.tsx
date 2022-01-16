import {
    ChakraProvider,
    Box,
    Text,
    VStack,
    Grid,
    theme,
    Button,
    Link,
  } from "@chakra-ui/react"
import { ColorModeSwitcher } from "../ColorModeSwitcher"
import { View } from "../constants";

export const ReadyToWatch = ({ setView }: { setView: (view: View) => void }) => {
    
    const links = [{label: 'Netflix', link: 'https://www.themoviedb.org/movie/808-shrek/watch'}, {label: 'Amazon', link: 'https://tv.apple.com/us/movie/shrek/umc.cmc.1xebq6b6acn6az49exa5ybl1c'}];
    // TODO get links from movie

    return (
      <ChakraProvider theme={theme}>
        <Box fontSize="xl">
          <Grid p={5}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <VStack spacing={1}>
              <Text 
                fontWeight='bold'
                fontSize="4xl"
                width='80%'
                textAlign='center'
                pb='20%'
              >
                Great, you're ready to watch!
              </Text>
              <Box width='100%' pb='10%'>
                <Text
                  fontWeight='bold'
                  fontSize="4xl"
                  textAlign='center'
                >
                  Watch on... 
                </Text>
                {links.map((movie, index) =>
                    <Text textDecoration='underline' pb='20px'>
                      <Link href={movie.link} target='_blank' rel='noopener noreferrer'>
                        {movie.label}
                      </Link>
                    </Text>
                )}
              </Box>
              <Button colorScheme={'purple'} size='md' width='80%' onClick={() => setView(View.LANDING)}>Done</Button>
            </VStack>
          </Grid>
        </Box>
      </ChakraProvider>
    )
}