import { useContext } from "react";
import { Box, Text, VStack, Grid, Button, Image } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { View } from "../constants";
import { MainContext } from "../context/main";

export const ResultSuccess = ({
  setView,
}: {
  setView: (view: View) => void;
}) => {
  const { isHost } = useContext(MainContext);

  const handleNegative = () => {
    setView(View.LANDING); //TODO resume the list
  };

  const handlePositive = () => {
    setView(View.READY_TO_WATCH);
  };

  var footer = <Text fontWeight="bold">Shea is confirming the movie</Text>;
  if (isHost) {
    footer = (
      <>
        <Text textAlign="center" fontWeight="bold" fontSize="4xl">
          Choose this movie?
        </Text>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Button
            colorScheme={"red"}
            size="md"
            width="20%"
            onClick={handleNegative}
          >
            No
          </Button>
          <Button
            colorScheme={"green"}
            size="md"
            width="20%"
            onClick={handlePositive}
          >
            Yes
          </Button>
        </Box>
      </>
    );
  }
  return (
    <Box fontSize="xl">
      <Grid p={5}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={1}>
          <Text fontWeight="bold" fontSize="4xl">
            Your group picked:
          </Text>
          <Box width="100%" maxHeight="50%" overflow="hidden">
            <Image
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.keengamer.com%2Fwp-content%2Fuploads%2F2020%2F09%2FGames-Like-Among-Us-cover.jpg&f=1&nofb=1"
              objectFit="cover"
              boxSize="400px"
            />
          </Box>
          <Box width="100%" textAlign="center">
            <Text fontSize="4xl" fontWeight="bold">
              Movie
            </Text>
            <Box display="flex" justifyContent="space-evenly">
              <Text>2021</Text>
              <Text>PG-13</Text>
              <Text>1h 33 min</Text>
              <Text>Action</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Available on:</Text>
              <Text>Netflix, Disney Plus, Amazon Prime</Text>
            </Box>
          </Box>
          <Box width="100%" pt="1%">
            {footer}
          </Box>
        </VStack>
      </Grid>
    </Box>
  );
};
