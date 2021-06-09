import React, { useEffect, useState } from 'react'
import { ReactTabulator } from 'react-tabulator'

import style from './style.module.scss'

import './style.scss'
import 'react-tabulator/css/bootstrap/tabulator_bootstrap.min.css';
import 'react-tabulator/lib/styles.css';

const TableList = ({columns_p=[],data_p=[],height="488px",onPressRow=()=>null}) => {

  const [columns, setColumns] = useState([]);

  const [data, setData] = useState([]);

  useEffect(() => {

    setColumns(columns_p);
    setData(data_p);
  }, [columns_p , data_p]);


  return (
    <ReactTabulator
        data={data}
        columns={columns}
        layout={"fitColumns"}
        height={height}
        options={{
            selectable:1,
            rowClick: (e, row) => {
              // alert("clicked");
              // console.log("----row----",)
              onPressRow(Object.values(row._row.data)[0])
            },
            selectableCheck: function (row) {
            //row - row component
            return true; //row.getData().color !== "yellow"; //allow selection of rows where the age is greater than 18
            },
        }}
    />
  )
}



export default TableList

