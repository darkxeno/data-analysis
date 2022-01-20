import React from "react";
import { Plot, newTable } from "@influxdata/giraffe";

const style = {
  width: "calc(100vw - 20px)",
  height: "calc(20vh - 20px)",
  margin: "10px"
};

const series = {
  type: "line",
  x: "Time",
  y: "Energy",
  lineWidth: 1,
  shadeBelow: true
};

export default function LineChart({ data }) {
  const times = data?.map((point) => new Date(point.timestamp).getTime()) || [];
  const values = data?.map((point) => point["0100011D00FF"]) || [];

  const table = newTable(times.length)
    .addColumn(series.x, "dateTime:RFC3339", "time", times)
    .addColumn(series.y, "double", "number", values);

  const config = {
    table,
    layers: [series]
  };

  return (
    <div style={style}>
      <Plot config={config} />
    </div>
  );
}
