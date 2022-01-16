import { useContext, useState } from "react";
import { Box, Text, VStack, Input, Grid, Button } from "@chakra-ui/react";

import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { Logo } from "../Logo";
import { MainContext } from "../context/main";
import { View } from "../constants";

export interface Props {
  callback: any;
}

export const LandingPage = ({ setView }: { setView: (view: View) => void }) => {
  const { name, setName, setGroupCode, setIsHost } = useContext(MainContext);
  // const { setUserId } = useContext(UsersContext);
  const [isJoinDisabled, setJoinDisabled] = useState(true);
  const [isCreateDisabled, setCreateDisabled] = useState(true);
  const [groupCodeInput, setGroupCodeInput] = useState("");

  const handleGroupCodeInputChange = (event: any) => {
    const newVal = event.target.value.toUpperCase();
    if (newVal.length <= 6 && /^[A-Z0-9]*$/g.test(newVal)) {
      setGroupCodeInput(newVal);
      setJoinDisabled(!(name.length > 0 && newVal.length === 6));
    } else {
      setJoinDisabled(!(name.length > 0 && groupCodeInput.length === 6));
    }
  };

  const onClickCreateGroup = () => {
    setIsHost(true);
    setView(View.CREATE_GROUP_STEP_ONE);
  };

  const onClickJoinGroup = () => {
    setGroupCode(groupCodeInput);
    setView(View.CREATE_GROUP_STEP_ONE);
  };

  const handleNameChange = (event: any) => {
    const newVal = event.target.value;
    setJoinDisabled(!(groupCodeInput.length === 6 && newVal.length > 0));
    setCreateDisabled(!(newVal.length > 0));
    setName(newVal);
  };

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
          <Text fontWeight={"bold"} fontSize="xl">
            App Name
          </Text>
          <Input
            placeholder="Enter name"
            value={name}
            onChange={handleNameChange}
          />
          <Button
            isDisabled={isCreateDisabled}
            colorScheme={"purple"}
            size="md"
            onClick={onClickCreateGroup}
          >
            Create Group
          </Button>
          <Text lineHeight="22px">OR</Text>
          <Input
            placeholder="Enter group code"
            value={groupCodeInput}
            onChange={handleGroupCodeInputChange}
          />
          <Button
            colorScheme={"purple"}
            isDisabled={isJoinDisabled}
            onClick={onClickJoinGroup}
          >
            Join Group
          </Button>
        </VStack>
      </Grid>
    </Box>
  );
};
