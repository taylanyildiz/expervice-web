import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ReactNode, useEffect, useState } from "react";

interface TabBarProps {
  tabs: ReactNode[];
  panels: ReactNode[];
  divider?: ReactNode | null | undefined;
}

function TabBar(props: TabBarProps) {
  const { tabs, panels, divider } = props;

  /// Selected state
  const [selected, setSelected] = useState<string>("0");

  /// Initialize component
  useEffect(() => {
    setSelected("0");
  }, []);

  /// Changed selected handle
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setSelected(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={selected}>
        <Box sx={{ borderBottom: divider ? 1 : 0, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {tabs.map((e, index) => (
              <Tab key={index} label={e} value={`${index}`} />
            ))}
          </TabList>
        </Box>
        {panels.map((e, index) => (
          <TabPanel key={index} value={`${index}`} children={e} />
        ))}
      </TabContext>
    </Box>
  );
}

export default TabBar;
