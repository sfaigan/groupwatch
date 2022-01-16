import {Box, Button, theme} from "@chakra-ui/react";

interface Props {
    handleMovieVote: any;
}

const MovieVoteButtons = ({handleMovieVote}: Props) => {
    return (
        <Box
        width={"100%"}
        display={"flex"}
        justifyContent="space-around"
      >
        <Button
          flexGrow={1}
          margin={3}
          backgroundColor={theme.colors.red[400]}
          size="lg"
          onClick={() => handleMovieVote("no")}
        >
          No
        </Button>
        <Button
          flexGrow={1}
          margin={3}
          backgroundColor={theme.colors.blue[400]}
          size="lg"
          onClick={() => handleMovieVote("maybe")}
        >
          Maybe
        </Button>
        <Button
          flexGrow={1}
          margin={3}
          backgroundColor={theme.colors.green[400]}
          size="lg"
          onClick={() => handleMovieVote("yes")}
        >
          Yes
        </Button>
      </Box>
    )
}

export default MovieVoteButtons
