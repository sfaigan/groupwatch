import { Box, Text, VStack, Grid, Button, Link } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { View } from "../constants";

export const ReadyToWatch = ({
  setView,
}: {
  setView: (view: View) => void;
}) => {
  const links = [
    {
      label: "Netflix",
      link: "https://www.themoviedb.org/movie/808-shrek/watch",
    },
    {
      label: "Apple TV+",
      link: "https://tv.apple.com/us/movie/shrek/umc.cmc.1xebq6b6acn6az49exa5ybl1c",
    },
    {
      label: "Amazon Prime Video",
      link: "https://www.amazon.com/gp/video/offers/signup?ref_=atv_mv_mv_signup",
    },
  ];

  return (
    <Box fontSize="xl">
      <Grid p={5}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={5}>
          <Text
            fontWeight="bold"
            fontSize="4xl"
            width="80%"
            textAlign="center"
            pb="5%"
          >
            Great, you're ready to watch!
          </Text>
          <VStack width="100%" pb="10%" spacing={2}>
            <Text
              fontWeight="bold"
              fontSize="4xl"
              textAlign="center"
              paddingBottom={4}
            >
              Watch on...
            </Text>
            {links.map((movie, index) => (
              <Link
                title={movie.label}
                style={{ userSelect: "none" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="row"
                variant="ghost"
                borderRadius="xl"
                borderWidth={1}
                borderColor={"current"}
                p={2}
                padding={2}
                mb={4}
                width={"50%"}
                href={movie.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant={"ghost"}>{movie.label}</Button>
              </Link>
            ))}
          </VStack>
          <Text
            marginTop={4}
            fontSize="2xl"
            textAlign="center"
            paddingBottom={4}
          >
            Or, start another group:
          </Text>
          <Button
            colorScheme={"purple"}
            size="md"
            width="80%"
            maxWidth={"33%"}
            onClick={() => setView(View.LANDING)}
          >
            Done
          </Button>
        </VStack>
      </Grid>
    </Box>
  );
};
