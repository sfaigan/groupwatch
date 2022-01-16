import { useState } from "react"
import {
  Button,
  Checkbox,
} from "@chakra-ui/react"

interface Props {
  text: string;
  onSelect: () => void;
}

export const ButtonCheckBox = ({ text, onSelect }: Props) => {
  const [selected, setSelected] = useState(false);
  const onClick = () => {
    setSelected(!selected);
    onSelect();
  }
  return (
    <Button justifyContent='space-between' colorScheme='purple' variant='outline' width='80%' isActive={selected} onClick={onClick} mt='10px'>
      {text}
      <Checkbox isChecked={selected}/>
    </Button>
  )
}