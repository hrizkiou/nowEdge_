import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reactFormatter } from 'react-tabulator'

import PreLoaderWidget from "../../../components/Loader";
import TableGrid from "../../../components/tables/tablegrid";
import TableList from "../../../components/tables/TableList";
import { getOrdersData } from "../../../redux/Wallet/actions";

const  Label = ({cell})=> {
    const rowData = cell._cell.row.data;
    const cellValue = cell._cell.value || "";
    if(rowData.type === "group_") return cellValue;
    return <span className={`badge ${ cellValue ==="Achat"  ? "badge-success" : "badge-danger"} badge-pill`}>{cellValue}  </span>;
  }


const  Status = ({cell})=> {
  
    return cell._cell.value  === 0 
    ? (
      <i class="fas fa-sync-alt" style={{ color: "#f9c851" }}></i>
    ) : cell._cell.value === 1 ? (
      <i class="fas fa-check" style={{ color: "#10c469" }}></i>
    ) : (
      <i class="fas fa-times" style={{ color: "#eb4d4d" }}></i>
    )
}

function customHeaderFilter(headerValue, rowValue, rowData, filterParams){

  return rowValue.toString().toUpperCase().includes(headerValue.toString().toUpperCase()); 
}



const  Cell = ({cell})=> {
  const cellValue = cell._cell.value || "";
  return <div  className="rtl"  >{cellValue}  </div>;
}




const Blotter = ({}) => {
  const dispatch = useDispatch();
  const { portfolio } = useSelector((state) => state.FinEdge.initialData);
  const { loading, orders } = useSelector((state) => state.Wallet);
  const [columns, setColumns ] = useState([]);

  const [data, setData] = useState([]);

  useEffect(() => { 
    dispatch(getOrdersData(portfolio.id));
  }, []);

  useEffect(() => {
     if(orders.length>0){

      const orders_ = orders.map((item) =>{ 
        delete item.status; 
        return item; 
      });
    
      const columns_ = Object.keys(orders_[0]).map((elem) =>{

        if(elem === 'Achat/Vente' || elem === 'Quantité' || elem === 'Prix de la transaction' || elem === 'Montant' || elem === 'status_')
        return { 
          title: elem === 'status_' ? "status" :elem, 
          field:elem, 
          hozAlign:elem === 'status_' || elem === 'Achat/Vente' ? "center" : "left",
          headerFilterPlaceholder:" ",
          formatter:reactFormatter(
            <Cell value={elem} />
          ),
          ...( elem !== 'Achat/Vente' &&
            { 
              sorter:function(a, b, aRow, bRow, column, dir, sorterParams){
         
                let a_ = parseFloat(a.replace(/\s/g, '').replace(/,/g, '.').replace(/€/g, ''))
    
                let b_ = parseFloat(b.replace(/\s/g, '').replace(/,/g, '.').replace(/€/g, ''))
    
                return a_ - b_ ;
               },
            }
          ),
          ...( elem === 'Achat/Vente' &&
            {
              formatter:reactFormatter(
                <Label value={elem} />
              )
            }
          ),
          ...( elem === 'status_' &&
            {
              formatter:reactFormatter(
                <Status value={elem} />
              )
            }
          )
        }

        if(elem === 'Catégorie')
        return { 
          title:elem, 
          field:elem, 
          // hozAlign:"center",
          headerFilter:"select", 
          headerFilterParams:{values:true},
          headerFilterPlaceholder:" "
        }


        return { 
          title:elem, 
          field:elem, 
          hozAlign:"left", 
          headerFilter: "input",
          headerFilterFunc:customHeaderFilter,
          headerFilterPlaceholder:" ",
          formatter:reactFormatter(
            <Cell value={elem} />
          ),
        }

      })
      
      setColumns(columns_);
      setData(orders_)


     }
  }, [orders])

  

  return (
    <>
    {loading && <PreLoaderWidget />}
      <TableList columns_p={columns} data_p={data} /> 
    </>
  );
};

export { Blotter };
