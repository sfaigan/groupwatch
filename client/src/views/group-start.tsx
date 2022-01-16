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
  } from "@chakra-ui/react"
import { ColorModeSwitcher } from "../ColorModeSwitcher"
import { MemberEntry } from "../components/member-entry";
import { BadgeType } from "../constants";
import { View } from "../constants";

export const GroupStart = ({ setView }: { setView: (view: View) => void }) => {
    const [isDisabled, setDisabled] = useState(false);
    
    const members = [{name: "shea", type: BadgeType.READY}, {name: "adam", type: BadgeType.READY}, {name: "collin", type: BadgeType.READY}, {name: "Steve", type: BadgeType.NOBADGE}, {name: "Sarah", type: BadgeType.NOBADGE}] // TODO replace this with a call to the server

    const onClick = () => {
       setView(View.RESULT_SUCCESS);
    }

    const code = "XXXXXX";

    return (
      <ChakraProvider theme={theme}>
        <Box fontSize="xl">
          <Grid p={10}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <VStack spacing={1}>
              <Text 
                fontWeight='bold'
                fontSize='md'
              >
                Share this code with your group
              </Text>
              <Text 
                fontWeight={'bold'}
                fontSize="4xl"
              >
                Group: {code}
              </Text>

              <Text 
                fontWeight={'bold'}
                fontSize="2xl"
                alignSelf='start'
              >
                Party
              </Text>

              <Box height='75%' pb={10} overflow="scroll">
                {members.map((member, index) => (
                  <MemberEntry text={member.name} type={member.type}/>
                ))}
              </Box>

              <Text 
                fontWeight='bold'
                fontSize='md'
                position='relative'
              >
                You can start the list when everyone is ready.
              </Text>
              <Button colorScheme={'purple'} size='md' width='80%' isDisabled={isDisabled} onClick={onClick}>Start</Button>
            </VStack>
          </Grid>
        </Box>
      </ChakraProvider>
    )
}