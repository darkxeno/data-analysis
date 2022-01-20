import React, { useState, useEffect } from 'react';
import { getMeasurements } from "../services/measurements";
import LineChart from "../components/LineChart";
import { FlexMonster } from '../components/FlexMonster';

export function Home(){

  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    const loadData = async ()=>{
      const response = await getMeasurements(1000000000);
      console.debug('Obtained response:', response);
      setMeasurements(response);
    }
    loadData();
  }, []);


  return (
    <>
      <LineChart data={measurements} />
      <FlexMonster data={measurements} />
    </>  
  )
}