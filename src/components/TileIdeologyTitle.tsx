import React from "react";
import TileSelectBox from "./TileSelectBox";
import RealDataTooltip from "./RealDataTooltip";

export default function TileIdeologyTitle(props: any) {
    var ideologyClassification: string  
    
    if(props.ideologyscore<-0.57){
      ideologyClassification = "Progressive"
    }
  
    else if(props.ideologyscore >=-0.57 && props.ideologyscore <-0.18 ){
      ideologyClassification = "Moderate Democrat"
    }
  
    else if (props.ideologyscore >=-0.18 && props.ideologyscore <0.22 ){
      ideologyClassification = "Centrist"
    }
    else if (props.ideologyscore >=0.22 && props.ideologyscore <0.71 ){
      ideologyClassification = "Moderate Conservative"
    }
    else {
      ideologyClassification = "Very Conservative"
    }
  
    var result : string = "Ideology: "+ideologyClassification 
  

  if (props.ideologyscore){
    return (
      <div className="w-full grid grid-cols-12 mb-6 h-6">
        <div className="col-start-1 col-end-8 text-base flex justify-start content-center items-center lg:text-lg font-semibold text-gray-600 truncate">
          <span>{result}</span>
          {!props.fakeData ? <RealDataTooltip /> : null}
        </div>
        <div className="col-start-9 col-end-13 flex justify-end content-center items-center">
          <TileSelectBox
            onChange={props.selectFunction}
            defaultValue={props.localPeriod}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-12 mb-6 h-6">
      <div className="col-start-1 col-end-13 text-base flex justify-start content-center items-center lg:text-lg font-semibold text-gray-600 truncate">
        <span>{props.title}</span>
        {!props.fakeData ? <RealDataTooltip /> : null}
      </div>
      <div className="col-start-13 col-end-13 flex justify-end content-center items-center invisible">
        <TileSelectBox
          onChange={props.selectFunction}
          defaultValue={props.localPeriod}
        />
      </div>
    </div>
  );
}



  