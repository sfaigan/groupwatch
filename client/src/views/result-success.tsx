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
import { ButtonCheckBox } from "../components/button-checkbox";
import { View } from "../constants";

export const ResultSuccess = ({ setView }: { setView: (view: View) => void }) => {
    const [isDisabled, setDisabled] = useState(false);
    
    const genres = ["Drama", "Action", "Comedy", "Horror", "Thriller", "Science Fiction", "Romance", "Documentary"]

    const onClick = () => {
       setView(View.GROUP_START)
    }


    return (
      <ChakraProvider theme={theme}>
        <Box fontSize="xl">
          <Grid p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <VStack spacing={1}>
              <Text 
                fontWeight={'bold'}
                fontSize="4xl"
              >
                Your group picked:
              </Text>
              
              <Button colorScheme={'purple'} size='md' width='80%' isDisabled={isDisabled} onClick={onClick}>Create Group</Button>
            </VStack>
          </Grid>
        </Box>
      </ChakraProvider>
    )
}