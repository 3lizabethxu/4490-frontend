import {
    Politician,
  } from "../interfaces/politician.interface";
import { useSelector } from "react-redux";
import { DataState } from "../interfaces/global.interface";
import {
  University,
} from "../interfaces/university.interface";

import { Link } from "react-router-dom";

export default function CustomHyperlinkLabel(
  props:any,
  labelData:{name:string; id:string, linkTo:string},
  ) {   

    
  
        // return(
        //   <text x={props.x-5} y={props.y+30} height="100%" fontSize={20} textAnchor="end" fill="red">
        //     <Link to= {"/universities" }>Hello</Link>
        //   </text>
        // );

        return(
       
            <text
            x={props.x-5}
            y={props.y+30}
            height="100%"
            fontSize={15}
            textAnchor="end"
            >
            
            <Link to={`/${labelData.linkTo}/${labelData.id}`}>{labelData.name}</Link>
            </text>

            
        );
      
}