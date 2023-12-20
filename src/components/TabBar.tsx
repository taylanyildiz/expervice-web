import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ReactNode, useEffect, useState } from "react";

type TabBarContent = {
  title: ReactNode;
  panel: ReactNode;
  visibility?: boolean;
};

interface TabBarProps {
  tabs: TabBarContent[];
  divider?: boolean;
  backgroundColor?: string;
  onChanged?: (value: number) => void;
  index?: number;
}

function TabBar(props: TabBarProps) {
  const { tabs, divider, backgroundColor, onChanged, index } = props;
  const tabsList = tabs.filter((e) => e.visibility ?? true);

  /// Selected state
  const [selected, setSelected] = useState<string>("0");

  /// Initialize component
  useEffect(() => {
    if (!index) return handleChange(null, "0");
    if (index.toString() == selected) return;
    handleChange(null, index.toString());
  }, [index]);

  /// Changed selected handle
  const handleChange = (_: any, newValue: string) => {
    setSelected(newValue);
    onChanged?.(parseInt(newValue));
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={selected}>
        <Box sx={{ borderBottom: divider ? 1 : 0, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {tabsList.map((e, index) => (
              <Tab key={index} label={e.title} value={`${index}`} />
            ))}
          </TabList>
        </Box>
        {tabsList.map((e, index) => (
          <TabPanel
            sx={{ backgroundColor: backgroundColor }}
            key={index}
            value={`${index}`}
            children={e.panel}
          />
        ))}
      </TabContext>
    </Box>
  );
}

export default TabBar;
