import {ArrowBackIcon} from '@chakra-ui/icons';
import {
    ChakraProvider,
    Box,
    Text,
    VStack,
    Grid,
    theme,
    Button,
    Image,
    IconButton,
  } from "@chakra-ui/react"
import { ColorModeSwitcher } from "../ColorModeSwitcher"
import { MemberEntry } from '../components/member-entry';
import { BadgeType, View } from "../constants";

export const MovieVoteResults = ({ setView }: { setView: (view: View) => void }) => {

    const votes = [{name: "Shea", vote: BadgeType.YES}, {name: "Adam", vote: BadgeType.MAYBE}, {name: "Collin", vote: BadgeType.NO}, {name: "Steve", vote: BadgeType.NOBADGE}, {name: "Sarah", vote: BadgeType.NOBADGE}]

    return (
      <ChakraProvider theme={theme}>
        <Box fontSize="xl">
          <IconButton aria-label="back" icon={<ArrowBackIcon />} onClick={() => setView(View.RESULT_FAILURE)}/>
          <Grid p={5}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <VStack spacing={1}>
              <Box width='100%' textAlign='center' >
                  <Text fontSize='4xl' fontWeight='bold'>Movie</Text>
                  <Box display='flex' justifyContent='space-evenly'>
                    <Text>2021</Text>
                    <Text>PG-13</Text>
                    <Text>1h 33 min</Text>
                    <Text>Action</Text>
                  </Box>
                  <Box>
                    <Text fontWeight='bold'>Available on:</Text>
                    <Text>Netflix, Disney Plus, Amazon Prime</Text>
                  </Box>
                </Box>
              {
                votes.map(vote => {
                  return <MemberEntry text={vote.name} type={vote.vote}/>
                })
              }
            </VStack>
          </Grid>
        </Box>
      </ChakraProvider>
    )
}