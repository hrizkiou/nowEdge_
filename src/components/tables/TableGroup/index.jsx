import React, { useEffect, useState } from 'react'
import { reactFormatter, ReactTabulator } from 'react-tabulator'

import style from './style.module.scss'

import './style.scss'
import 'react-tabulator/css/bootstrap/tabulator_bootstrap.min.css'
import 'react-tabulator/lib/styles.css'

const  Label2 = ({cell})=> {
  const rowData = cell._cell.row.data;
  const cellValue = cell._cell.value || "";
  if(rowData.type === "group_") return cellValue;
  return <span className={`badge ${ cellValue ==="Achat"  ? "badge-success" : "badge-danger"} badge-pill`}>{cellValue}  </span>;
}

const Label = ({text})=>{

  if(text?.toString().charAt(0) === "+" && text?.toString().includes("%"))
  return <span class="badge badge-success badge-pill float-left  p-1"  >{text} <i class="ml-2 fas fa-caret-down"></i> </span>
  if(text?.toString().charAt(0) === "-" && text?.toString().includes("%"))
  return <span class="badge badge-danger badge-pill float-left   p-1">{text} <i class="ml-2 fas fa-caret-down"></i> </span>
  else
  return <>{text}</>;
}

const  SimpleButton = ({cell})=> {
    const rowData = cell._cell.row.data;
    const cellValue = cell._cell.value || "";
    if(rowData.type === "group_") return cellValue;
    return <Label text={cellValue} />
  }


const cellClassFormatter = (cell, formatterParams) =>{

     const myElement = cell._cell.row.data.type;
     const index = cell._cell.row.data.index || 1;

     if(myElement){
        cell.getElement().classList.add("mystyle");
        return `
                  <div class="${style.row_group_index}" > ${index || 22}</div> 
                  <div class="${style.row_group_text}" > ${cell.getValue()} </div>
               `
     }

    return  `<div class="${style.row_group_index_c}" >${cell.getValue()}</div>`; //return the contents of the cell;
}

function customHeaderFilter(headerValue, rowValue, rowData, filterParams){
  //headerValue - the value of the header filter element
  //rowValue - the value of the column in this row
  //rowData - the data for the row being filtered
  //filterParams - params object passed to the headerFilterFuncParams property

  console.log("rowData.name===>>> ",rowValue);

  // .includes(headerValue.toUpperCase()) 
  // if(rowData._children){
  //   const list  = rowData._children.find( (elem) => Object.values(elem)[0].toUpperCase().includes(headerValue.toUpperCase())  )  ;

  //   return list;
  // }
  // rowData._children.includes() 
  // //console.log("filterParams.name",headerValue);
  return  false;   //rowData.name == filterParams.name && rowValue < headerValue; //must return a boolean, true if it passes the filter.
}

// headerFilterFunc:customHeaderFilter

const columns_ = [
    {title:"Name", field:"name", responsive:0 , hozAlign: "left" ,formatter:cellClassFormatter , headerFilter: "input",headerFilterFunc:customHeaderFilter}, 
    {title:"Location", field:"location" , hozAlign:"center"},
    {title:"Gender", field:"gender",  responsive:2 , hozAlign:"center"}, //hide this column first
    {title:"Favourite Color", field:"col",formatter: reactFormatter(
        <SimpleButton
          onSelect={(name) => {
            this.setState({ selectedName: name });
            alert(name);
          }}
        />
      ),hozAlign:"center"},
    {title:"Date Of Birth", field:"dob", hozAlign:"center", sorter:"date"},
    ];

const tableDataNested_ = [
    {name:"Oli Bob", location:"", gender:"", col:"", dob:"1984",type:"group_",index:0, _children:[
        {name:"Mary May", location:"Germany", gender:"female", col:"-12%", dob:"14/05/1982"},
        {name:"Mary May", location:"Germany", gender:"female", col:"-13%", dob:"14/05/1982"},
        {name:"Mary May", location:"Germany", gender:"female", col:"-1%", dob:"14/05/1982"},
        {name:"Christine Lobowski", location:"France", gender:"female", col:"+12%", dob:"22/05/1982"},
        {name:"Christine Lobowski", location:"France", gender:"female", col:"+12%", dob:"22/05/1982"},
        {name:"Christine Lobowski", location:"France", gender:"female", col:"-1%", dob:"22/05/1982"},
        {name:"Christine Lobowski", location:"France", gender:"female", col:"-2%", dob:"22/05/1982"},
    ]},
    {name:"Jamie Newhart", location:"", gender:"", col:"", dob:"185",type:"group_",index:1,_children:[
        {name:"Emily Sykes", location:"South Korea", gender:"female", col:"-12%", dob:"11/11/1970"},
        {name:"Emily Sykes", location:"South Korea", gender:"female", col:"-12%", dob:"11/11/1970"},
        {name:"Emily Sykes", location:"South Korea", gender:"female", col:"-12%", dob:"11/11/1970"},
        {name:"Emily Sykes", location:"South Korea", gender:"female", col:"-12%", dob:"11/11/1970"},
    ]},,
    {name:"Gemma Jane", location:"", gender:"", col:"", dob:"120",type:"group_",index:2, _children:[
        {name:"Emily Sykes", location:"South Korea", gender:"female", col:"-12%", dob:"11/11/1970"},
        {name:"Emily Sykes", location:"South Korea", gender:"female", col:"-12%", dob:"11/11/1970"},
        {name:"Emily Sykes", location:"South Korea", gender:"female", col:"-12%", dob:"11/11/1970"},
        {name:"Emily Sykes", location:"South Korea", gender:"female", col:"-12%", dob:"11/11/1970"},
    ]},
    {name:"James Newman", location:"", gender:"", col:"", dob:"2022",type:"group_",index:3,_children:[
        {name:"Emily Sykes", location:"South Korea", gender:"female", col:"-120%", dob:"11/11/1970"},
        {name:"Emily Sykes", location:"South Korea", gender:"female", col:"+11%", dob:"11/11/1970"},
        {name:"Emily Sykes", location:"South Korea", gender:"female", col:"+120%", dob:"11/11/1970"},
        {name:"Emily Sykes", location:"South Korea", gender:"female", col:"+30%", dob:"11/11/1970"},
    ]},
];

let deepMatchHeaderFilterStatusMap = {};

  function deepMatchHeaderFilter(headerValue, rowValue, rowData, filterParams) {
    // We check if we've already walked through that node (and therefore subtree).
    let cachedStatus = deepMatchHeaderFilterStatusMap[rowData.id];
    if (cachedStatus != null) {
      //  If so, we return the cached result.
      return cachedStatus;
    }

    let columnName = filterParams.columnName;
  
    let anyChildMatch = false;
    for (let childRow of rowData._children || []) {
      // We walk down the tree recursively
      let match = deepMatchHeaderFilter(
        headerValue,
        childRow[columnName],
        childRow,
        filterParams
      );
    deepMatchHeaderFilterStatusMap[rowData.id] = match;
      if (match) {
        anyChildMatch = true;
      }
    }
  
    // If any child (and therefore any descendant) matched, we return true.
    if (anyChildMatch) {
      return true;
    }

    // We run the actual maching test where applicable. This could be a customised function (passed in the filterParams, for example).
    if (rowValue != null && rowValue.toString().toLowerCase().includes(headerValue.toLowerCase())) {
      return true;
    }

    return false;
  }

const TableGroup = ({columns_p,data_p , onPressRow=()=>null}) => {

  const [columns, setColumns] = useState([]);

  const [data, setData] = useState(
    []
  );

  useEffect(() => {

    const list = columns_p.map((elem,index)=>{

      return { 
        title:elem, 
        field:elem , 
        hozAlign:"center", 
        ...( index == 0 &&
          {
            hozAlign:"left", 
            headerFilter: "input",
            headerFilterFunc: deepMatchHeaderFilter,
            headerFilterFuncParams: {
              columnName: elem,
            },
            formatter:cellClassFormatter
          }
        ),
        ...( elem == "Variation" &&

          {
            formatter:reactFormatter(
            <Label2 value={elem} />
          )
        }
        )
    }
      
    });

    list.push({
        title: "ID",
        field: "id",
        visible: false,
    })



    const list_data =  data_p.map((elem,i)=>{

      let ld = {};

      list.map((elm,index)=>{
        if(index===1)
         ld ={...ld,[elm.title]:""} 

          else if(index>0){
            const index__  = Object.keys(elem).findIndex((element) => typeof element === "string" ?   element.toUpperCase().includes(elm.title.toUpperCase()) : false );

            ld ={...ld,[elm.title]:    Object.values(elem)[index__] } 
          }
       })

      return {
        [list[0].title] : elem.title,
         ...ld,
         type:"group_",
         index:i+1,
         id:i,
         ...( elem.list && 
                {_children       : elem.list.map((item)=>{
                  let ls = {};

                  item.map((elm,index)=>{
                      ls = {...ls,[list[index].title]:elm , id: index + i + Date.now() }
                    })

                    return ls;

                  })
                }
            )
      }

    });


   setTimeout(() =>{
    setColumns(list)

    setData(list_data);
   },1000)

    
  }, [columns_p , data_p]);


  return (
    <ReactTabulator
    // height={"311px"}
    data={data}
    columns={columns}
    tooltips={true}
    movableRows={true}
    layout={"fitColumns"}
    height={"488px"}
    options={{
        dataTree:true,
        // dataTreeElementColumn:columns_p[0]||"", 
        dataTreeBranchElement:false,
        dataTreeStartExpanded:true,
        dataTreeSelectPropagate:true,
        dataTreeCollapseElement:"<span><i class=' fas fa-angle-down mr-1'></i></span>",
        dataTreeExpandElement:"<span><i class='fas fa-angle-right mr-1'></i></span>",
        selectable:1,
        rowClick: (e, row) => {
          // alert("clicked");

          onPressRow(Object.values(row._row.data)[0])
          // //console.log("-----row---->>>",)
        },
        selectableCheck: function (row) {
        //row - row component
         return true; //row.getData().color !== "yellow"; //allow selection of rows where the age is greater than 18
        },
    }}
 
    />
  )
}

const TableGroupMarket = ()=>{





}

export default TableGroup

export {
  TableGroupMarket
}
