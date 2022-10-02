import { useState } from "react";
import Table from "../Component/Table";
import TableTwo from "../Component/TableTwo";

export default function Home() {
  // Create interarrival time
  let randomValue = [];
  let IAT = [];
  for (let i = 1; i <= 20; i++) {
    randomValue = [...randomValue, Math.round(Math.random() * 1000)];
  }
  randomValue.map((value) => {
    if (value < 126) {
      IAT = [...IAT, 1];
    } else if (value > 125 && value < 251) {
      IAT = [...IAT, 2];
    } else if (value > 250 && value < 376) {
      IAT = [...IAT, 3];
    } else if (value > 375 && value < 501) {
      IAT = [...IAT, 4];
    } else if (value > 500 && value < 626) {
      IAT = [...IAT, 5];
    } else if (value > 625 && value < 751) {
      IAT = [...IAT, 6];
    } else if (value > 750 && value < 876) {
      IAT = [...IAT, 7];
    } else {
      IAT = [...IAT, 8];
    }
  });

  // create Arrival time
  let arrivalTime = [0];
  IAT.map((value, index) => {
    if (index === 0) {
      return;
    }
    arrivalTime = [...arrivalTime, arrivalTime[index - 1] + value];
  });

  // create service time
  let randomValueForST = [];
  let serviceTime = [];
  for (let i = 1; i <= 20; i++) {
    randomValueForST = [...randomValueForST, Math.round(Math.random() * 100)];
  }
  randomValueForST.map((value) => {
    if (value < 11) {
      serviceTime = [...serviceTime, 1];
    } else if (value > 10 && value < 31) {
      serviceTime = [...serviceTime, 2];
    } else if (value > 30 && value < 61) {
      serviceTime = [...serviceTime, 3];
    } else if (value > 61 && value < 86) {
      serviceTime = [...serviceTime, 4];
    } else if (value > 85 && value < 96) {
      serviceTime = [...serviceTime, 5];
    } else if (value > 95 && value < 101) {
      serviceTime = [...serviceTime, 6];
    }
  });

  let finalTableValue = [];
  arrivalTime.map((value, index) => {
    let tempTimeServiceBegins = 0;
    let tempTimeServiceEnds = 0;
    let tempWaitingTime = 0;
    let tempTimeSpendInSystem = 0;
    let tempIdeleTimeOfService = 0;
    if (index === 0) {
      tempTimeServiceBegins = value;
      tempIdeleTimeOfService = tempTimeServiceBegins;
    } else {
      tempTimeServiceBegins = Math.max(
        value,
        finalTableValue[index - 1].timeServiceEnds
      );
      // tempIdeleTimeOfService
      tempIdeleTimeOfService =
        tempTimeServiceBegins - finalTableValue[index - 1].timeServiceBegins;

      if (
        finalTableValue[index - 1].arrivalTime +
          finalTableValue[index - 1].serviceTime <
        value
      ) {
        tempTimeServiceBegins = value;
      } else {
        tempTimeServiceBegins =
          finalTableValue[index - 1].serviceTime +
          finalTableValue[index - 1].timeServiceBegins;
      }
    }
    tempWaitingTime = tempTimeServiceBegins - value;
    tempTimeServiceEnds = tempTimeServiceBegins + serviceTime[index];
    tempTimeSpendInSystem = serviceTime[index] + tempWaitingTime;
    // console.log(index, finalTableValue[index - 1]);
    finalTableValue = [
      ...finalTableValue,
      {
        randomValueForIAT: randomValue[index],
        IAT: IAT[index],
        randomValueForST: randomValueForST[index],
        arrivalTime: value,
        serviceTime: serviceTime[index],
        waitingTime: tempWaitingTime,
        timeServiceBegins: tempTimeServiceBegins,
        timeServiceEnds: tempTimeServiceEnds,
        timeSpendInSystem: tempTimeSpendInSystem,
        ideleTimeOfService: tempIdeleTimeOfService,
      },
    ];
  });

  return (
    <div>
      <h2>HTML Table</h2>

      {finalTableValue && <Table finalTableValue={finalTableValue} />}
    </div>
  );
}
