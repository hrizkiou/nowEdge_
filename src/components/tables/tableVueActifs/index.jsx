import PropTypes from 'prop-types';
import React, { useState } from 'react';

import style from './style.module.scss';

const Label = ({text})=>{

    if(text?.toString().charAt(0) === "+" && text?.toString().includes("%"))
    return <span class="badge badge-success badge-pill float-left  p-1"  >{text} <i class="ml-2 fas fa-caret-down"></i> </span>
    if(text?.toString().charAt(0) === "-" && text?.toString().includes("%"))
    return <span class="badge badge-danger badge-pill float-left   p-1">{text} <i class="ml-2 fas fa-caret-down"></i> </span>
    else
    return <>{text}</>;
}

const AccordionRow = ({num=1,title='Actions',totalPL="323.231,22",list=[],numberOfColumn=1,  onPressRow = ()=>{}, enablePressRow = false }) =>{

    const [state, setstate] = useState(true);
    const handlerClick = ()=>{
        setstate(!state)
    }
    return(
            <>
               <tr className={style.view} onClick={handlerClick} >
                 <td>
                     <span className="">
                     {num}
                     </span>
                      <i className={`fas ${state ? 'fa-caret-down' : 'fa-caret-up'} mr-2 ml-2`} ></i> 
                     <span>
                      {title}
                     </span>
                 </td>
                 <td className={style.textAlign_center} >
                     
                  {totalPL}
                    
                 </td>
                 <td></td>
                </tr>
                {
                    list.map((elem)=>
                    <tr className={[style.fold, state ? style.open : null ].join(" ")} onClick={()=>{
                  if(enablePressRow){
                    onPressRow(elem[0]);
                  }
              }}
              
              style={{
                  cursor: enablePressRow ? "pointer" : ""
              }}
              >
                      { Array.from(Array(numberOfColumn).keys()).map((el,index)=><td>
                        <Label text={elem[index]} />
                      </td>)}
                    </tr>
                    )
                }
            </>
    )
}

// 

const TableFinEdge = ({
    head=["Actif","Quantité","Prix d'achat","Dernier cours","Variation","Valorisation" , "P&L"],
    listRow,
    onPressRow = ()=>{}, enablePressRow = false 
}) => {
    
  return (
    <div className="table-responsive">
         <table class={style.fixed_header}>
            <thead>
                <tr>
                    <th>
                        <div>
                          {head[0]}
                        </div>
                        <div>
                        <input  style={{width:'120px'}} type="text" />
                        </div>
                    </th>
                    {head.map((elem,index)=>{

                        if(index>0)
                        return <th>{elem}</th>
                    })

                    }
                    
                </tr>
            </thead>
            <tbody>
            {listRow.map(elem=>{

                return <AccordionRow num={elem.num} title={elem.title} totalPL={elem.totalPL} list={elem.list} numberOfColumn={head.length} onPressRow={onPressRow} enablePressRow={enablePressRow}  />
            })}
             
            </tbody>
            </table>                             
     </div>
  )
}

TableFinEdge.propTypes = {}

export default TableFinEdge
