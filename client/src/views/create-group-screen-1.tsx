import React, { SyntheticEvent, useState } from "react"

import {
    ChakraProvider,
    Box,
    Text,
    VStack,
    Grid,
    theme,
    Button,
    FormControl,
    FormLabel,
    Switch,
    Checkbox,
  } from "@chakra-ui/react"
  import { ColorModeSwitcher } from "../ColorModeSwitcher"

export interface Props {
    callback: any;
}

export const CreateGroupScreenOne = (props: Props) =>{
    const [isDisabled, setDisabled] = useState(false);
    const [isNetflixChosen, setNetflixChosen] = useState(false);
    const [isDisneyChosen, setDisneyChosen] = useState(false);
    const [isAmazonChosen, setAmazonChosen] = useState(false);
    const [isAppleChosen, setAppleChosen] = useState(false);
    const [isCraveChosen, setCraveChosen] = useState(false);

    const onClick = () => {
       props.callback(2);
    }

    return (
      <ChakraProvider theme={theme}>
        <Box fontSize="xl">
          <Grid minH="100vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <VStack spacing={1}>
              <Text 
                fontWeight={'bold'}
                // width={[
                //   '100%',
                //   null,
                //   null,
                //   null,
                //   null,
                // ]}
                fontSize='xl'
              >
                You are group leader.
              </Text>

              <FormControl mt={31} align='center' display='flex' alignItems='center'>
                <FormLabel>
                    Are you watching in person?
                </FormLabel>
                <Switch id='in-person'/>
              </FormControl>
              <Text>What streaming services are you subscribed to?</Text>
              <Button justifyContent='space-between' colorScheme='purple' variant='outline' width='80%' isActive={isNetflixChosen} onClick={() => setNetflixChosen(!isNetflixChosen)}>
                Netflix
                <Checkbox isChecked={isNetflixChosen}/>
              </Button>
              <Button justifyContent='space-between' colorScheme='purple' variant='outline' width='80%'  isActive={isDisneyChosen} onClick={() => setDisneyChosen(!isDisneyChosen)}>
                Disney Plus
                <Checkbox isChecked={isDisneyChosen}/>
              </Button>
              <Button justifyContent='space-between' colorScheme='purple' variant='outline' width='80%'  isActive={isAmazonChosen} onClick={() => setAmazonChosen(!isAmazonChosen)}>
                Amazon Prime
                <Checkbox isChecked={isAmazonChosen}/>
              </Button>
              <Button justifyContent='space-between' colorScheme='purple' variant='outline' width='80%'  isActive={isAppleChosen} onClick={() => setAppleChosen(!isAppleChosen)}>
                Apple TV Plus
                <Checkbox isChecked={isAppleChosen}/>
              </Button>
              <Button justifyContent='space-between' colorScheme='purple' variant='outline' width='80%'  isActive={isCraveChosen} onClick={() => setCraveChosen(!isCraveChosen)}>
                Crave
                <Checkbox isChecked={isCraveChosen}/>
              </Button>
              <Button colorScheme={'purple'} size='md' width='80%' isDisabled={isDisabled} onClick={onClick}>Next</Button>
            </VStack>
          </Grid>
        </Box>
      </ChakraProvider>
    )
}