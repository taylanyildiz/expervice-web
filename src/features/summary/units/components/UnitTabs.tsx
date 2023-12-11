import TranslateHelper from "@Local/index";
import { TabContext, TabList } from "@mui/lab";
import { Divider, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useResolvedPath } from "react-router-dom";

function UnitTabs() {
  // Selected value state
  const [value, setValue] = useState<string>("0");

  /// Path
  const resolvePath = useResolvedPath({});
  const path = resolvePath.pathname;

  /// Navigator
  const navigate = useNavigate();

  /// Initialize component
  /// And listen path
  useEffect(() => {
    if (path.includes("/units/map")) {
      return setValue("1");
    }
    return setValue("0");
  }, [path]);

  const tabSx = {
    border: 1,
    mx: 1,
    borderBottom: 0,
    borderColor: "divider",
    borderRadius: "4px 4px 0px 0px",
  };

  return (
    <div style={{ position: "sticky" }}>
      <TabContext value={value}>
        <TabList
          onChange={(_, v) => {
            let path = "";
            if (v === "0") path = "/units";
            if (v === "1") path = "/units/map";
            navigate(path);
          }}
        >
          <Tab sx={tabSx} value="0" label={TranslateHelper.unitsList()} />
          <Tab sx={tabSx} value="1" label={TranslateHelper.unitsMap()} />
        </TabList>
      </TabContext>
      <Divider />
    </div>
  );
}

export default UnitTabs;
