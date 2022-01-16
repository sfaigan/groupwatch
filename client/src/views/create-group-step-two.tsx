import { useState, useContext, useEffect } from "react"

import {
    ChakraProvider,
    Box,
    Text,
    VStack,
    Grid,
    theme,
    Button,
    useToast,
  } from "@chakra-ui/react"
import { ColorModeSwitcher } from "../ColorModeSwitcher"
import { ButtonCheckBox } from "../components/button-checkbox";
import { View, Genre } from "../constants";
import { MainContext } from "../context/main";
import { SocketContext } from "../context/socket";
import { UsersContext } from "../context/users";

export const CreateGroupStepTwo = ({ setView }: { setView: (view: View) => void }) => {
  const socket = useContext<any>(SocketContext);
  const [isDisabled, setDisabled] = useState(true);
  const { setUsers } = useContext(UsersContext);
  const { groupCode, setGroupCode, isHost, name, streamingServices, genres, setGenres } = useContext(MainContext);
  const toast = useToast();

  useEffect(() => {
    socket.on("users", (users: any): void => {
      console.log("Users updated.");
      console.log(users);
      setUsers(users)
    })
  });

  const updateGenres = (genre: number) => {
    const index = genres.findIndex((value: number) => value === genre);
    const temp = genres;
    if (index >= 0) {
      temp.splice(index);
      setGenres(temp);
    } else {
      temp.push(genre);
      setGenres(temp);
    }
    setDisabled(!(temp.length > 0));
  }

  const handleCreateGroup = () => {
    socket.connect();
    socket.emit("createGroup", name, streamingServices, genres, (newGroupCode?: string, error?: string) => {
      console.log(`Attempting to create group ${newGroupCode}...`);
      if (error || !newGroupCode) {
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
      console.log(`Successfully created group ${newGroupCode}!`);
      setGroupCode(newGroupCode);
      setView(View.GROUP_START);
      return toast({
        title: "Welcome to the group!",
        description: `Created group ${newGroupCode}`,
        status: "success",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    });
  };

  const handleJoinGroup = () => {
    socket.connect();
    socket.emit("joinGroup", groupCode, name, streamingServices, genres, (error: string) => {
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
      setView(View.GROUP_START);
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
              fontSize='md'
            >
              What genre(s) do you want to watch?
            </Text>
            <Box width='100%' textAlign='center' maxHeight='60%' overflow='scroll'>
              {
                Object.keys(Genre).map((key: string) => {
                  return <ButtonCheckBox
                    onSelect= {() => updateGenres(Genre[key].id)}
                    text={Genre[key].text}
                  />
                })
              }
            </Box>

            <Button
              colorScheme={'purple'}
              size='md'
              width='80%'
              isDisabled={isDisabled}
              onClick={isHost ? handleCreateGroup : handleJoinGroup}
            >
              { isHost ? "Create Group" : "Join Group" }
            </Button>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}