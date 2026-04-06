import * as far from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Select, Flex } from "@sanity/ui";
import React from "react";

// Filter out metadata and keep actual icon objects
// const iconList = Object.keys(far).filter((key) => key !== "far" && key !== "prefix");
const iconList = [
  "faCloud",
  "faCode",
  "faCodeCommit",
  "faCog",
  "faDatabase",
  "faGear",
  "faGears",
  "faProjectDiagram",
  "faServer",
  "faWrench"
];

export const IconPicker = (props: any) => {
  const { elementProps, value } = props;

  return (
    <Box>
      <Flex align="center" gap={3} flex={1}>
        <Box flex={1}>
          <Select {...elementProps} value={value}>
            <option value="">Select an icon...</option>
            {iconList.map((iconName) => (
              <option key={iconName} value={iconName}>
                {iconName.replace("fa", "")}
              </option>
            ))}
          </Select>
        </Box>
        <Box style={{ fontSize: "24px", width: "30px" }} flex={1}>
          {value && far[value as keyof typeof far] && (
            <>
              <FontAwesomeIcon icon={far[value as keyof typeof far] as any} />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
};
