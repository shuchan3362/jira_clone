import {
  HStack,
  Button,
  Stack,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { Modal } from "./Modal";
import { TabsMap } from "./constants";
import { useHistory } from "react-router-dom";

type Props = {};

type LocationName = keyof typeof TabsMap;

export const Header: React.FC<Props> = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const history = useHistory();
  const handleChangeTab = useCallback(
    (tabIndex: number) => {
      const locationTabValue = Object.values(TabsMap).find(
        (tab) => tab.value === tabIndex
      );
      history.push(locationTabValue?.key || "");
    },
    [history]
  );
  const locationName = history.location.pathname.slice(1) as LocationName;
  const defaultIndex = TabsMap[locationName].value;
  return (
    <>
      <HStack align="baseline">
        <Tabs
          variant="enclosed"
          onChange={handleChangeTab}
          w="100%"
          defaultIndex={defaultIndex}
        >
          <TabList>
            {Object.values(TabsMap).map((tab) => (
              <Tab key={tab.value}>{tab.label}</Tab>
            ))}
          </TabList>
        </Tabs>
        <Button onClick={onOpen}>作成</Button>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
