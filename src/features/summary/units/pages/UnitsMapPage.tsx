import GMap from "@Components/GMap";
import UnitRepository from "@Repo/unit_repository";
import { AppDispatch } from "@Store/index";
import { setUnitFilter, setUnitId } from "@Store/unit_store";
import { Divider, Grid, List, Typography } from "@mui/material";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useUnit } from "../helper/unit_helper";
import UnitListItem from "../components/UnitListItem";
import { InfoWindow, Marker } from "@react-google-maps/api";
import Unit from "@Models/units/unit";
import VisibilityComp from "@Components/VisibilityComp";
import { EJobType } from "@Features/summary/jobs/entities/job_enums";

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
    ref.current?.children.item(index)?.scrollIntoView({ behavior: "smooth" });
  };

  /// Markers of units
  const markers: ReactNode[] = useMemo(() => {
    return units
      .filter((e) => Boolean(e.latitude && e.longitude))
      .map((e, i) => {
        const hasFault = Boolean(e.job);
        const isFault = e.job?.type_id === EJobType.Fault;
        const color = hasFault ? (isFault ? "red" : "blue") : "green";
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
            icon={{
              url: `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
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

  /// Ref of scroll
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div className="units-map-page">
      <div ref={ref} className="units-map-list">
        <>
          {units.map((e, i) => (
            <List>
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
            </List>
          ))}
        </>
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
