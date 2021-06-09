import PropTypes from 'prop-types';
import React, { useState } from 'react';

import style from './style.module.scss';


const AccordionRow = ({list=[],numberOfColumn=1}) =>{

    const [state, setstate] = useState(true);
    const handlerClick = ()=>{
        setstate(!state)
    }
    return(
            <>
                {
                    list.map((elem)=>
                    <tr className={[style.fold , style.open  ].join(" ")}>
                      { Array.from(Array(numberOfColumn).keys()).map((el,index)=><td>
                       { elem[index]}
                      </td>)}
                    </tr>
                    )
                }
            </>
    )
}

// 

const TableFinM = ({
    head=["Actif","Quantité","Prix d'achat","Dernier cours","Variation","Valorisation" , "P&L"],
    listRow
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

                return <AccordionRow  list={elem.list} numberOfColumn={head.length} />
            })}
             
            </tbody>
            </table>                             
     </div>
  )
}

TableFinM.propTypes = {}

export default TableFinM
