import GMap from "@Components/GMap";
import UnitRepository from "@Repo/unit_repository";
import { AppDispatch } from "@Store/index";
import { setUnitFilter, setUnitId } from "@Store/unit_store";
import { Divider, Grid, List, Typography } from "@mui/material";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useUnit } from "../helper/unit_helper";
import UnitListItem from "../components/UnitListItem";
import { InfoWindow, Marker } from "@react-google-maps/api";
import Unit from "@Models/units/unit";
import VisibilityComp from "@Components/VisibilityComp";

function UnitsMapPage() {
  /// Unit repo
  const unitRepo = new UnitRepository();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Unit store
  const {
    units: { rows },
    filter,
  } = useUnit();

  /// Units with [display]
  const [units, setUnits] = useState<(Unit & { display: boolean })[]>([]);

  useEffect(() => {
    const units = rows.map((e) => ({
      ...e,
      display: false,
    }));
    setUnits(units);
  }, [rows]);

  /// Toogle pin
  const handleTogglePin = (
    unit: Unit & { display: boolean },
    index: number
  ) => {
    const newList = [...units.map((e) => ({ ...e, display: false }))];
    newList[index] = { ...unit, display: !unit.display };
    setUnits(newList);
  };

  /// Markers of units
  const markers: ReactNode[] = useMemo(() => {
    return units
      .filter((e) => Boolean(e.latitude && e.longitude))
      .map((e, i) => {
        return (
          <Marker
            key={e.id}
            position={{
              lat: parseFloat(e.latitude!),
              lng: parseFloat(e.longitude!),
            }}
            onClick={() => {
              handleTogglePin(e, i);
            }}
          >
            <VisibilityComp visibility={e.display}>
              <InfoWindow
                onCloseClick={() => {
                  handleTogglePin(e, i);
                }}
                position={{
                  lat: parseFloat(e.latitude!),
                  lng: parseFloat(e.longitude!),
                }}
              >
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant="h1" fontSize={13} children={e.name} />
                  </Grid>
                </Grid>
              </InfoWindow>
            </VisibilityComp>
          </Marker>
        );
      });
  }, [units]);

  useEffect(() => {
    dispatch(
      setUnitFilter({
        ...filter,
        limit: null,
        offset: null,
      })
    );
  }, []);

  /// Initialize component
  useEffect(() => {
    unitRepo.getUnits();
  }, [filter]);

  return (
    <div className="units-map-page">
      <div className="units-map-list">
        <List>
          {units.map((e, i) => (
            <>
              <UnitListItem
                key={e.id}
                unit={e}
                selected={e.display}
                onClick={() => {
                  dispatch(setUnitId(e.id));
                }}
                onMap={() => {
                  handleTogglePin(e, i);
                }}
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
