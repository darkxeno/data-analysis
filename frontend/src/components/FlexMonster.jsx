import React, { useMemo, useRef } from "react";
import "flexmonster/flexmonster.css";
import * as FlexmonsterReact from "react-flexmonster";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const slice = {
  rows: [
    { uniqueName: "weekday" },
    { uniqueName: "date.Day" },
    { uniqueName: "datetime" }
  ],
  columns: [{ uniqueName: "measurement" }, { uniqueName: "muid" }],
  measures: [
    {
      uniqueName: "value",
      aggregation: "sum"
    },
    {
      uniqueName: "value",
      aggregation: "average"
    },
    {
      uniqueName: "value",
      aggregation: "stdevs"
    }
  ]
};

const types = {
  datetime: { type: "datetime" },
  weekday: { type: "weekday" }
};

export function FlexMonster({ data }) {
  const flexmonsterRef = useRef(null);

  const transformedData = useMemo(
    () =>
      data.map(({ timestamp, "0100011D00FF": value, measurement, tags }) => ({
        measurement,
        datetime: timestamp,
        date: timestamp,
        weekday: weekdays[new Date(timestamp).getDay()],
        value,
        muid: tags.muid
      })),
    [data]
  );

  if (flexmonsterRef?.current?.flexmonster) {
    flexmonsterRef.current.flexmonster.setReport({
      dataSource: { data: [types, ...transformedData] },
      slice
    });
  }

  return (
    <FlexmonsterReact.Pivot
      ref={flexmonsterRef}
      toolbar={true}
      width="100%"
      height={ Math.ceil(window.innerHeight * 0.8) }
    />
  );
}
