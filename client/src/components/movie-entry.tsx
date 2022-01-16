import { InfoOutlineIcon, SearchIcon } from "@chakra-ui/icons";

import {
  Button, ButtonGroup, IconButton,
} from "@chakra-ui/react"

interface Props {
  text: string;
  onSelect: () => void;
  onOpen: () => void;
  selected: boolean;
}

export const MovieEntry = ({ text, onSelect, selected, onOpen }: Props) => {
var badgeLabel = "Select";
var opacityVar;
if (selected) {
    badgeLabel = "Unselect";
    opacityVar = "0.5"
}
  return (
    <ButtonGroup isAttached width='100%' mt='10px'>
      <Button rightIcon={<InfoOutlineIcon />} justifyContent='space-between' colorScheme='purple' variant='outline' width='100%' onClick={onOpen}>
        {text}
      </Button>
      {/* <IconButton colorScheme='purple' variant='outline' aria-label='Info' icon={} /> */}
      <Button colorScheme='purple' variant='outline' isActive={selected} onClick={onSelect}>{badgeLabel}</Button>
    </ButtonGroup>
  )
}