import React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import useTheme from "@mui/system/useTheme";

interface TabPanelProps {
  tabContent: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { tabContent, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3, display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          <Typography>{tabContent}</Typography>
        </Box>
      )}
    </div>
  );
}

interface BasicTabsProps {
  tabData: { label: string; content: React.ReactNode; chips?: React.ReactNode[] }[];
}

export default function BasicTabs({ tabData }: BasicTabsProps) {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          marginTop: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          {tabData.map((tab, index) => (
            <Tab key={index} label={tab.label} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>
      {tabData.map((tab, index) => (
        <CustomTabPanel
          key={index}
          tabContent={tab.content}
          value={value}
          index={index}
        />
      ))}
    </Box>
  );
}
