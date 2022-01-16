import { StarIcon, TimeIcon, CheckIcon, CalendarIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";

const iconMap = {
    vote_average: StarIcon,
    duration: TimeIcon,
    genre: CheckIcon,
    release_date: CalendarIcon,
  };

  
// icon is the key of iconMap
const MovieDetailChip = ({ icon, value }: { icon: string; value: string }) => {
    //@ts-ignore
    const Icon = iconMap[icon];
    return (
      <Box
        title={`${icon}: ${value}`}
        style={{userSelect: "none"}}
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
        mr={2}
        mb={2}
      >
        {Icon && <Icon color="current" size="1.5em" />}
        <Text paddingLeft={2} fontSize="sm">{value}</Text>
      </Box>
    );
  };

  export default MovieDetailChip