import GMap from "@Components/GMap";
import UnitRepository from "@Repo/unit_repository";
import { AppDispatch } from "@Store/index";
import { setUnitFilter, setUnitId } from "@Store/unit_store";
import { Box, CircularProgress, Divider, List } from "@mui/material";
import { ReactNode, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useUnit } from "../helper/unit_helper";
import UnitListItem from "../components/UnitListItem";
import { Marker } from "@react-google-maps/api";

function UnitsMapPage() {
  /// Unit repo
  const unitRepo = new UnitRepository();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Unit store
  const {
    layzLoading: loading,
    units: { rows },
  } = useUnit();

  /// Markers of units
  const markers: ReactNode[] = useMemo(() => {
    return rows
      .filter((e) => Boolean(e.latitude && e.longitude))
      .map((e) => {
        return (
          <Marker
            key={e.id}
            position={{
              lat: parseFloat(e.latitude!),
              lng: parseFloat(e.longitude!),
            }}
          />
        );
      });
  }, [rows]);

  /// Initialize component
  useEffect(() => {
    dispatch(setUnitFilter(null));
    unitRepo.getUnits();
  }, []);

  return (
    <div className="units-map-page">
      <div className="units-map-list">
        <List>
          {rows.map((e) => (
            <>
              <UnitListItem
                key={e.id}
                unit={e}
                onClick={() => {
                  dispatch(setUnitId(e.id));
                }}
                onMap={() => {}}
              />
              <Divider component="li" />
            </>
          ))}
        </List>
      </div>
      <div className="units-map">
        <GMap
          width="100%"
          height="100%"
          center={{ lat: -40, lng: 20 }}
          children={markers}
        />
      </div>
    </div>
  );
}

export default UnitsMapPage;
