import { CalendarIcon, CheckIcon, StarIcon, TimeIcon } from "@chakra-ui/icons";
import {
  ChakraProvider,
  theme,
  Box,
  Grid,
  VStack,
  Image,
  Text,
  Wrap,
  Icon,
  Button,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

const MOVIE = {
  id: 516329,
  title: "Antlers",
  poster_path: "/cMch3tiexw3FdOEeZxMWVel61Xg.jpg",
  overview:
    "A small-town Oregon teacher and her brother, the local sheriff, discover a young student is harbouring a dangerous secret that could have frightening consequences.",
  release_date: "2021-10-28",
  vote_average: 6.5,
  genres: [
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 9648,
      name: "Mystery",
    },
  ],
  duration: 99,
};

const USER = {
  id: 1,
  name: "John Doe",
  isHost: true,
  isReady: true,
};

function formatDuration(duration: number) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h ${minutes}m`;
}

function formatImageURL(path: string) {
  return `https://image.tmdb.org/t/p/w500${path}`;
}

const iconMap = {
  vote_average: StarIcon,
  duration: TimeIcon,
  genre: CheckIcon,
  release_date: CalendarIcon,
};

interface Props {
  callback: any;
}

// icon is the key of iconMap
const InfoChip = ({ icon, value }: { icon: string; value: string }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="row"
      background={theme.colors.gray[500]}
      borderRadius="md"
      padding={2}
      mr={2}
      mb={2}
    >
      <Text fontSize="sm">{value}</Text>
    </Box>
  );
};

export const MovieRecommender = ({ callback }: Props) => {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid p={3}>
          {USER.isHost && (
            <Button
              backgroundColor={theme.colors.red[500]}
              justifySelf="flex-start"
              position="absolute"
            >
              Stop
            </Button>
          )}
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack height={"100%"} spacing={6}>
            <Image
              maxHeight={"40%"}
              marginTop={2}
              src={formatImageURL(MOVIE.poster_path)}
            />
            <Text fontWeight={"bold"} fontSize="xl">
              {MOVIE.title}
            </Text>
            <Text fontSize="sm">{MOVIE.overview}</Text>
            <Wrap>
              <InfoChip
                key={MOVIE.release_date}
                icon={"calendar"}
                value={MOVIE.release_date}
              />
              <InfoChip
                key={MOVIE.duration}
                icon={"time"}
                value={formatDuration(MOVIE.duration)}
              />
              <InfoChip
                key={MOVIE.vote_average}
                icon={"star"}
                value={`${MOVIE.vote_average}`}
              />
              {MOVIE.genres.map((genre) => (
                <InfoChip key={genre.id} icon={"check"} value={genre.name} />
              ))}
            </Wrap>
            <Box
              alignSelf={"end"}
              width={"100%"}
              display={"flex"}
              marginTop={4}
              justifyContent="space-evenly"
            >
              <Button
                backgroundColor={theme.colors.red[400]}
                size="lg"
                onClick={() => callback("no")}
              >
                No
              </Button>
              <Button
                backgroundColor={theme.colors.blue[400]}
                size="lg"
                onClick={() => callback("maybe")}
              >
                Maybe
              </Button>
              <Button
                backgroundColor={theme.colors.green[400]}
                size="lg"
                onClick={() => callback("yes")}
              >
                Yes
              </Button>
            </Box>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

export default MovieRecommender;
