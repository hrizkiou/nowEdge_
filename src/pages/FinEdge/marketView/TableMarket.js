import React, { useEffect, useState } from 'react'
import { reactFormatter } from 'react-tabulator';

import TableList from '../../../components/tables/TableList'

const  Label = ({cell})=> {
    const rowData = cell._cell.row.data;
    const cellValue = cell._cell.value || "";
    if(rowData.type === "group_") return cellValue;
    return <span 
                className={`badge ${ cellValue.includes("+")   ? "badge-success" : "badge-danger"} badge-pill`}
            >
              {cellValue}  
              <i className={`ml-1 fas   ${ cellValue.includes("+")  ? "fa-caret-up":"fa-angle-down"}`}></i>
           </span>;
  }

const TableMarket = ({data,options,onPressRow = ()=>{}}) => {

    const [columns, setColumns ] = useState([]);

    const [data_, setData] = useState([]);

    useEffect(() => {

     if(data?.length > 0) { 
      console.log('---data[0]',data[0])
 
      const columns_ = Object.keys(data[0]).map((elem) =>{
            if(elem === 'Actif ')
            return { 
              title:elem, 
              field:elem, 
              hozAlign:"center", 
              headerFilter: "input",
              headerFilterPlaceholder:" "
            }
    
            

          if(elem === 'Variation')
          return { 
            title:elem, 
            field:elem, 
            hozAlign:"center", 
            formatter:reactFormatter(
                <Label value={elem} />
              )
          }
          
          return { 
            title:elem, 
            field:elem, 
            hozAlign:"center", 
           
          }
  
        })

        setColumns(columns_);
        setData(data)
      }

    }, [data?.length]);
  return (
    <TableList columns_p={columns} data_p={data_} height="797px" onPressRow={onPressRow} /> 
  )
}


export default TableMarket
