import GMap from "@Components/GMap";
import UnitRepository from "@Repo/unit_repository";
import { AppDispatch } from "@Store/index";
import { setUnitId } from "@Store/unit_store";
import { Divider, List, Typography } from "@mui/material";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useUnit } from "../helper/unit_helper";
import UnitListItem from "../components/UnitListItem";
import { InfoWindow, Marker } from "@react-google-maps/api";
import Unit from "@Models/units/unit";
import { EJobType } from "@Features/summary/jobs/entities/job_enums";
import LoadingComp from "@Components/LoadingComp";
import Condition2Comp from "@Components/Condition2Comp";
import UnitEmptyBox from "../components/UnitEmptyBox";

function UnitsMapPage() {
  /// Unit repo
  const unitRepo = new UnitRepository();

  /// Dispatch
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  /// Unit store
  const {
    layzLoading,
    units: { rows },
    filter,
  } = useUnit();

  /// Units with [display]
  const [units, setUnits] = useState<(Unit & { display: boolean })[]>([]);

  /// Hast lat lng units
  const filterUnits = units.filter((e) => Boolean(e.latitude && e.longitude));

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
    return filterUnits.map((e, i) => {
      const hasFault = Boolean(e.job);
      const isFault = e.job?.type_id === EJobType.Fault;
      const color = hasFault ? (isFault ? "red" : "blue") : "green";
      const position = {
        lat: parseFloat(e.latitude!),
        lng: parseFloat(e.longitude!),
      };
      return (
        <Marker
          key={e.id}
          position={position}
          onClick={() => {
            handleTogglePin(e, i);
          }}
          icon={{
            url: `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
          }}
        >
          {e.display && (
            <InfoWindow
              position={position}
              onCloseClick={() => {
                handleTogglePin(e, i);
              }}
            >
              <Typography variant="h1" fontSize={13} children={e.name} />
            </InfoWindow>
          )}
        </Marker>
      );
    });
  }, [units]);

  /// Initialize component
  useEffect(() => {
    unitRepo.getUnits(true);
  }, [filter]);

  /// Ref of scroll
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div className="units-map-page">
      <div ref={ref} className="units-map-list">
        <LoadingComp loading={layzLoading}>
          <Condition2Comp
            showFirst={units.length !== 0}
            secondComp={<UnitEmptyBox />}
            firstComp={units.map((e, i) => (
              <List disablePadding>
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
          />
        </LoadingComp>
      </div>
      <div className="units-map">
        <GMap
          width="100%"
          height="100%"
          zoom={30}
          children={markers}
          locations={filterUnits?.map((e) => ({
            lat: parseFloat(e.latitude!),
            lng: parseFloat(e.longitude!),
          }))}
        />
      </div>
    </div>
  );
}

export default UnitsMapPage;
