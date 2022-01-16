import React, { SyntheticEvent, useState } from "react"

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
  } from "@chakra-ui/react"
  import { ColorModeSwitcher } from "../ColorModeSwitcher"
  import { Logo } from "../Logo"

export const LandingPage = () =>{
    const [isDisabled, setDisabled] = useState(true);
    const [value, setValue] = React.useState('')
    const handleChange = (event: any) => {
        const newVal = event.target.value.toUpperCase();
      if (newVal.length <= 6 && /^[A-Z0-9]*$/g.test(newVal)) {
        setValue(newVal)
      }
      setDisabled(!(event.target.value.length === 6 || value.length === 6))
    }

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
              <Button colorScheme={'purple'} size='md'>Create Group</Button>
              <Text
                lineHeight='22px'>
                OR
              </Text>
              <Input 
                placeholder='Enter group code'
                value={value}
                onChange={handleChange}
                //width=...
              />
              <Button colorScheme={'purple'} isDisabled={isDisabled}>Join Room</Button>
            </VStack>
          </Grid>
        </Box>
      </ChakraProvider>
    )
}