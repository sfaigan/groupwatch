import { useState } from "react"
import {
    Button,
    Checkbox,
  } from "@chakra-ui/react"
export interface Props {
    text: string;
    //callback: any; //TODO allow parent to see whether this is selected
}

export const ButtonCheckBox = (props: Props) => {
    const [isChosen, setChosen] = useState(false);
    return (
        <Button justifyContent='space-between' colorScheme='purple' variant='outline' width='80%' isActive={isChosen} onClick={() => setChosen(!isChosen)}>
                {props.text}
                <Checkbox isChecked={isChosen}/>
        </Button>
    )
}