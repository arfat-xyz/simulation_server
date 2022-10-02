import React, { useEffect, useState } from "react";

const Table = ({ finalTableValue }) => {
  const [children, setChildren] = useState([]);
  useEffect(() => {
    finalTableValue.map((value, index) => setChildren([...children, value]));
  }, []);
  console.log(children.length);
  return (
    <div>
      <table className="table table-bordered border-primary text-center">
        <thead>
          <tr>
            <th scope="col">Random Value</th>
            <th scope="col">IAT</th>
            <th scope="col">random value for service time</th>
            <th scope="col">Arrival Time</th>
            <th scope="col">Service Time</th>
            <th scope="col"> Time Service Begins</th>
            <th scope="col">Waitng time</th>
            <th scope="col">Time service ends</th>
            <th scope="col">Time spent in systems</th>
            <th scope="col">Idle time of service</th>
          </tr>
        </thead>
        <tbody>
          {children.length == 20
            ? children.map((value) => value)
            : "loading. please wait"}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
