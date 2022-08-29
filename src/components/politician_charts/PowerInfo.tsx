import React from "react";
import { useSelector } from "react-redux";
import { DataState } from "../../interfaces/global.interface";
import { Politician } from "../../interfaces/politician.interface";
import { ordinalSuffixOf } from "../../helper/formatting";
import RealDataTooltip from "../RealDataTooltip";

import PowerGaugeMeter from "../PowerGaugeMeter";
export default function PowerInfo(props: any) {
  // Access the redux store
  const politicians: Record<number, Politician> = useSelector(
    (state: DataState) => state.politicians
  );

  const poli = politicians[props.poliId];

  // Compute politicians time in congress
  let timeInHouse = "N/A";
  let timeInSenate = "N/A";
  for (let i = 0; i < poli.timeInCongress.length; i++) {
    const start = new Date(poli.timeInCongress[i].startdate);
    const end = new Date(poli.timeInCongress[i].enddate);
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();

    if (poli.timeInCongress[i].position.toLowerCase() === "house") {
      timeInHouse = startYear + " - " + endYear;
    } else if (poli.timeInCongress[i].position.toLowerCase() === "senate") {
      timeInSenate = startYear + " - " + endYear;
    }
  }


  if(props.poliId>2000){
  return (
    <div className="w-full pl-8 pr-8 lg:pt-8 2xl:pl-20 2xl:pr-20 overflow-y-auto">
      <div className="flex justify-center mb-2 text-lg lg:text-xl font-light">
        <span>POWER</span><RealDataTooltip/>
      </div>
     
       <div className="flex justify-between">
        <div>
             <PowerGaugeMeter></PowerGaugeMeter>
        </div>
      </div> 
      {/* <div className="flex justify-between">
        <div>
          <div className="text-lg lg:text-xl font-semibold">{timeInSenate}</div>
          <div className="text-base lg:text-lg font-light leading-none">
            Time in Senate
          </div>
        </div>
        <div>
          <div className="text-lg lg:text-xl font-semibold">{timeInHouse}</div>
          <div className="text-base lg:text-lg font-light leading-none">
            Time in House
          </div>
        </div>
      </div> */}



  {/* Should be conditional field, depending on which you are if will show item 
  everyone has a main number out of 587

  ratio out of 587 (everyone) - stick to percentage for now 587/587 is 100%
  btm left label is total

  */}
  <div className="flex justify-between ">
          <div>
            <div className="text-lg lg:text-xl font-semibold">300/587</div>
            <div className="text-base lg:text-lg font-light leading-none">
              House
            </div>
          </div>
          <div>
            <div className="text-lg lg:text-xl font-semibold">300/100</div>
            <div className="text-base lg:text-lg font-light leading-none">
              Senate
            </div>

          </div>
          <div>
            <div className="text-lg lg:text-xl font-semibold">300/50</div>
            <div className="text-base lg:text-lg font-light leading-none">
              Governor
            </div>

          </div>
        </div>

      


        <div className="mt-5">
          {poli.committee.map((item, index) => {
            return (
              <div className="text-base lg:text-lg leading-none mb-2" key={index}>
                <div className="font-medium"><span className="font-normal">{ordinalSuffixOf(item.rank) + " ranked member in "}</span>{item.name}</div>
              </div>
            );
          })}
          {poli.committee.length > 0 ? <div className="font-light">Committees</div> : null}
        </div>
      </div>
    );
  }
  
  
  

  else{
    return (
      <div className="w-full pl-8 pr-8 lg:pt-8 2xl:pl-20 2xl:pr-20 overflow-y-auto">
          <div className="text-base lg:text-lg font-light leading-none">
              Power Tile Unavailable: As dummy, politician id is smaller than 2000 so this data is not shown.
            </div>
        </div>
      );
  }
}
