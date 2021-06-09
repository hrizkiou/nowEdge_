import style from "./style.module.scss";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

const Searchable = ({ value ,onChange=()=>null}) => {
  return (
    <div>
      <div style={{textAlign:'left'}}>
      {value}
      </div>
      <input type="text" onChange={(e)=>{
        onChange(e.target.value,value)
      }} />
    </div>
  );
};

const Selectable = ({ value ,data=[] , onChange = ()=>null}) => {

  const [state, setState] = useState([]);
  useEffect(() => {
    const list = [... new Set(data.map((elem,index)=>{
      return elem[value];
    })) ]
    setState(list)
   
  }, [data]);

  return (
    <div>
      <div style={{textAlign:'left'}} >
        {value}
      </div>
      <select onChange={(e)=>{
          onChange(e.target.value,value)
              //  ////console.log('----e----101010--->>',e.target.value)
      }} >
      <option  ></option>
      {state.map((elem)=>{

        return <option value={elem} >{elem}</option>
      })}
      
      </select>
    </div>
  );
};

const Label = ({ child, value }) => {
  const elm = Object.entries(child).find(([key, val], index) =>
    value.includes(key)
  );


  return (
  <div style={{
    display: "flex",
    justifyContent: "center"
  }} >
      <span
     style={{width:"80px",justifyContent:"space-between"}}
      className={`badge badge-${
        elm[1] ? "success" : "danger"
      } badge-pill  d-flex  pl-2 pr-2`}
    >
      <div>{value}</div> <i className={`ml-2 fas fa-caret-${elm[1] ? "up" : "down"}`}></i>
    </span>
  </div>
  );
};

const data = [
  {
    "#": "32, 231",
    "Stats de la journée": "Volume",
  },
  {
    "#": "32, 231",
    "Stats de la journée": "Ouverture",
  },
  {
    "#": "32, 231",
    "Stats de la journée": "Plus haut",
  },
  {
    "#": "32, 231",
    "Stats de la journée": "Plus bas",
  },
  {
    "#": "32, 231",
    "Stats de la journée": "Clôture veille",
  },
  {
    "#": "32, 231",
    "Stats de la journée": "Volatilité",
  },
  {
    "#": "32, 231",
    "Stats de la journée": "Volume",
  },
];

const TableGrid = ({data = [],  options, bodyStyle = {}, onPressRow = ()=>{}, enablePressRow = false  }) => {
  const refTable = useRef();

  const [data_, setData] = useState([])
  const [state, setRet] = useState(false);

  const itemEls = useRef(new Array());

  const columnLength = data.length > 0 ? Object.entries(data[0]).length : 0;

  useEffect(() => {
    // ////console.log("----data_---",data)

    setData(data);
  }, [data]);

  const pushRef = (element) => {
    if (itemEls.current.length <= columnLength) {
      itemEls.current.push(element);
      ////console.log("start", element?.offsetWidth);
    }

    if (itemEls.current.length === columnLength && !state) {
      setRet(!state);
    }
  };

  const onSearch = (val,pr) =>{
    ////console.log("----val--->",val)
    ////console.log("----pr--->",pr)
    const list = data.filter((elem,index)=>{

      return elem[pr].toUpperCase().includes(val.toUpperCase())
    })

    setData(list)

  }

  ////console.log("----data_---",data_)
  return (
    <table border="0" className={style.tbl_cnt} ref={refTable}>
      <thead>
        <tr  >
          {data.length > 0 &&
            Object.entries(data[0]).map(([key, val], index) => {
              return (
                <td
                  key={key}
                  ref={pushRef}
                  style={{
                    alignItems:'center',
                    width: `${
                      options[index]?.width ? options[index].width + "px" : ""
                    }`,
                  }}
                >
                  {options[index]?.type === "search" ? (
                    <Searchable value={key} onChange={onSearch} />
                  ) : options[index]?.type === "select" ? (
                    <Selectable value={key} data={data} onChange={onSearch} />
                  ) : (
                    <>{key}</>
                  )}
                </td>
              );
            })}
        </tr>
      </thead>
      <tbody style={{ ...bodyStyle }}>
        {
          data_.map((elem) => {
            return (
              <tr onClick={()=>{
                  if(enablePressRow){
                    onPressRow(Object.entries(elem)[0][1])
                  }
              }} style={{
                  cursor: enablePressRow ? "pointer" : ""
              }}>
                {Object.entries(elem).map(([key, val], index) => {
                  return (
                        <td
                          key={index}
                          style={{
                            width: `${itemEls.current[index]?.offsetWidth}px`,
                            display: "inline-block",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                          }}
                        >
                          {!options[index]?.label ? (
                            <>{val}</>
                          ) : (
                            <Label child={options[index]?.label} value={val} />
                          )}
                        </td>
                      );
                    })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};

TableGrid.propTypes = {};

// export { TableGridGroup }

export default TableGrid;
