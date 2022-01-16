import { useState, useContext } from "react"

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
  } from "@chakra-ui/react"
import { ColorModeSwitcher } from "../ColorModeSwitcher"
import { ButtonCheckBox } from "../components/button-checkbox";
import { View, StreamingService } from "../constants";
import { MainContext } from "../context/main";
import { SocketContext } from "../context/socket";

export const CreateGroupStepOne = ({ setView }: { setView: (view: View) => void }) => {
  const [isDisabled, setDisabled] = useState(false); // TODO button is disabled if <1 option checked
  const { streamingServices, setStreamingServices } = useContext(MainContext);

  const updateStreamingServices = (streamingService: number) => {
    const index = streamingServices.findIndex((value: number) => value === streamingService);
    const temp = streamingServices;
    if (index >= 0) {
      temp.splice(index);
      setStreamingServices(temp);
    } else {
      temp.push(streamingService);
      setStreamingServices(temp);
    }
  }

  const onClick = () => {
      setView(View.CREATE_GROUP_STEP_TWO);
  }

  return (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl">
        <Grid p={3}>
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
            {
              Object.keys(StreamingService).map((key: string) => {
                return <ButtonCheckBox
                  onSelect= {() => updateStreamingServices(StreamingService[key].id)}
                  text={StreamingService[key].text}
                />
              })
            }
            <Button colorScheme={'purple'} size='md' width='80%' isDisabled={isDisabled} onClick={onClick}>Next</Button>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}