import React, { SyntheticEvent, useContext, useState, useEffect, ContextType } from "react"
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
    useToast,
  } from "@chakra-ui/react"

import { ColorModeSwitcher } from "../ColorModeSwitcher"
import { Logo } from "../Logo"
import { MainContext } from "../context/main";
import { SocketContext } from "../context/socket";
import { UsersContext } from "../context/users";
import { View } from "../constants";

export interface Props {
  callback: any;
}

export const LandingPage = ({ setView }: { setView: (view: View) => void }) => {
  const socket = useContext<any>(SocketContext);
  const { name, setName, groupCode, setGroupCode } = useContext(MainContext);
  // const { setUserId } = useContext(UsersContext);
  const [isJoinDisabled, setJoinDisabled] = useState(true);
  const [isCreateDisabled, setCreateDisabled] = useState(true);
  const toast = useToast();

  const handleGroupCodeChange = (event: any) => {
    const newVal = event.target.value.toUpperCase();
    if (newVal.length <= 6 && /^[A-Z0-9]*$/g.test(newVal)) {
      setGroupCode(newVal);
      setJoinDisabled(!(name.length > 0 && newVal.length === 6));
    } else {
      setJoinDisabled(!(name.length > 0 && groupCode.length === 6));
    }
  };
  
  const handleNameChange = (event: any) => {
    const newVal = event.target.value;
    setJoinDisabled(!(groupCode.length === 6 && newVal.length > 0));
    setCreateDisabled(!(newVal.length > 0));
    setName(newVal);
  }
  // useEffect(() => {
  //   socket.on("users", (user: any): void => {
  //     console.log("HELLO!");
  //     console.log(user);
  //     setUserId(user);
  //   })
  // });

  const handleCreateGroup = () => {
    socket.connect();
    socket.emit("createGroup", name, (groupCode?: string, error?: string) => {
      console.log(`Attempting to create group ${groupCode}...`);
      if (error) {
        console.log(error);
        return toast({
          title: "Error",
          description: error,
          status: "error",
          duration: 4000,
          position: "top",
          isClosable: true,
        });
      }
      console.log(`Successfully created group ${groupCode}!`);
      setView(View.CREATE_GROUP_STEP_ONE);
      return toast({
        title: "Welcome to the group!",
        description: `Created group ${groupCode}`,
        status: "success",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    });
  };

  const handleJoinGroup = () => {
    socket.connect();
    socket.emit("joinGroup", name, groupCode, (error: string) => {
      console.log(`Attempting to join group ${groupCode}...`);
      if (error) {
        console.log(error);
        return toast({
          title: "Error",
          description: error,
          status: "error",
          duration: 4000,
          position: "top",
          isClosable: true,
        });
      }
      return toast({
        title: "Welcome to the group!",
        description: `Joined group ${groupCode}`,
        status: "success",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    });
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
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
              App Name
            </Text>
            <Input 
              placeholder='Enter name'
              value={name}
              onChange={handleNameChange}
              //width=...
            />
            <Button isDisabled={isCreateDisabled} colorScheme={'purple'} size='md' onClick={handleCreateGroup}>Create Group</Button>
            <Text
              lineHeight='22px'>
              OR
            </Text>
            <Input 
              placeholder='Enter group code'
              value={groupCode}
              onChange={handleGroupCodeChange}
              //width=...
            />
            <Button colorScheme={'purple'} isDisabled={isJoinDisabled} onClick={handleJoinGroup}>Join Group</Button>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}