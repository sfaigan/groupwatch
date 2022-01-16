import React, { SyntheticEvent, useState, useContext, useEffect } from "react"

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
import { MainContext } from "../context/main";
import { User, UsersContext } from "../context/users";
import { SocketContext } from "../context/socket";

export const GroupStart = ({ setView }: { setView: (view: View) => void }) => {
  const { groupCode, isHost } = useContext(MainContext);
  const { users, setUsers } = useContext(UsersContext);
  const socket = useContext<any>(SocketContext);
  
  // const members = [{name: "shea", type: BadgeType.READY}, {name: "adam", type: BadgeType.READY}, {name: "collin", type: BadgeType.READY}, {name: "Steve", type: BadgeType.NOBADGE}, {name: "Sarah", type: BadgeType.NOBADGE}] // TODO replace this with a call to the server

  const onClick = () => {
    socket.emit("startSearch", groupCode, (error: string) => {
      console.log(`Attempting to join group ${groupCode}...`);
      if (error) {
        console.log(error);
      }
    });
    setView(View.MOVIE_RECOMMENDER);
  }

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
              Group: {groupCode}
            </Text>

            <Text 
              fontWeight={'bold'}
              fontSize="2xl"
              alignSelf='start'
            >
              Party
            </Text>

            <Box height='75%' pb={10} width="100%" overflowY="scroll">
              {
                Object.keys(users).map((key: string) => {
                  const user = users[key];
                  return <MemberEntry text={user.name} type={BadgeType.READY}/>
                })
              }
            </Box>
            { isHost ? (
              <Box width="100%">
                <Text 
                  fontWeight='bold'
                  fontSize='md'
                  position='relative'
                >
                  You can start when everyone is ready.
                </Text>
                <Button colorScheme={'purple'} size='md' width='100%' onClick={onClick}>Start</Button>
              </Box>
            ) : (
              <Text 
                fontWeight='bold'
                fontSize='md'
                position='relative'
              >
                Please wait for the group leader to start.
              </Text>
            )}
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}