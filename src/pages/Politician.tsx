import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { addPoliticianPeriod } from "../store/actions/politicianActionCreators";

import IdeologyDistribution from "../components/politician_charts/IdeologyDistribution";
import TopDonationsDollarsByIndustry from "../components/politician_charts/TopDonationsDollarsByIndustry";
import TopDonationsDollarsByCorporation from "../components/politician_charts/TopDonationsDollarsByCorporation";
import TopDonationsDollarsByUniversity from "../components/politician_charts/TopDonationsDollarsByUniversity";
import PoliticianInfo from "../components/politician_charts/PoliticianInfo";
import TileSelectBox from "../components/TileSelectBox";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { Header } from "../components/Header";
import LoadingScreen from "../components/LoadingScreen";
import { DataState } from "../interfaces/global.interface";
import { Politician as IPolitician } from "../interfaces/politician.interface";
import PowerInfo from "../components/politician_charts/PowerInfo";
import WealthInfo from "../components/politician_charts/WealthInfo";
import PowerIdeology from "../components/politician_charts/PowerIdeology";

export default function Politician() {
  // Get the default current period
  const temp = new Date();
  const curr_year = temp.getFullYear();
  let start;
  let end;
  // Start with the current period one cycle back (in case data takes long to gather)
  if (curr_year % 2 === 0) {
    start = curr_year - 3;
    end = curr_year - 2;
  } else {
    start = curr_year - 2;
    end = curr_year - 1;
  }

  //Allows selection period to default to current period instead of one year back
  let startproxy = start+2;
  let endproxy = end+2;

  let shortened_endproxy = Number(String(endproxy).slice(-2));


  //OLD LINE for nxt line DELETE LATER*********************** const default_period = start.toString() + "-" + end.toString();

  // Master period control
  const default_period = startproxy.toString() + "-" + endproxy.toString();
  const [current_period, setCurrentPeriod] = useState(default_period);

  // Get the corporation id from the url
  const url_params = useParams();
  if (!url_params.poliId) {
    return <div>Politician not specified!</div>;
  }
  const poli_id: string = url_params.poliId;

  // Setup the redux store
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    // Enter the periods data into the redux store
    dispatch(addPoliticianPeriod(poli_id, current_period));
  }, [dispatch, current_period, poli_id]);

  // Access the redux store
  const politicians: Record<string, IPolitician> = useSelector(
    (state: DataState) => state.politicians
  );

  if (
    politicians[poli_id] !== undefined &&
    politicians[poli_id].periods[current_period] !== undefined
  ) {
    const tailwindGridRow =
      "flex flex-col w-full h-screen mb-12 lg:mb-0 lg:h-80 2xl:h-96 lg:overflow-auto lg:grid lg:grid-cols-12 lg:gap-x-8 lg:pb-4 lg:pt-4 lg:pt-1" +
      " ";
    const tailwindTileStyles =
      "pl-3 pr-3 pt-2 pb-6 mb-4 h-1/3 flex justify-content-center content-center rounded lg:overflow-hidden border border-gray-150 shadow-md lg:mb-0 lg:pt-4 lg:pb-6 lg:pl-4 lg:pr-2 lg:h-full" +
      " ";





    // Compute politicians time in congress
    let timeInCongress = 0;
    for (let i = 0; i < politicians[poli_id].timeInCongress.length; i++) {
      const start = new Date(politicians[poli_id].timeInCongress[i].startdate);
      const end = new Date(politicians[poli_id].timeInCongress[i].enddate);
      const startYear = start.getFullYear();
      let endYear = end.getFullYear();
  
      if (endYear > new Date().getFullYear()) {
        endYear = new Date().getFullYear();
      }
      timeInCongress += endYear - startYear;
    }
  
    // Figure out if this politician is a current senator or rep
    let role = "";
    let retired = true;
    for (let i = 0; i < politicians[poli_id].timeInCongress.length; i++) {
      const start = new Date(politicians[poli_id].timeInCongress[i].startdate);
      const end = new Date(politicians[poli_id].timeInCongress[i].enddate);
      if (
        politicians[poli_id].timeInCongress[i].position.toLowerCase() === "senate" &&
        start <= new Date() &&
        new Date() <= end
      ) {
        role = "Senator";
        retired = false;
        break;
      } else if (
        politicians[poli_id].timeInCongress[i].position.toLowerCase() === "house" &&
        start <= new Date() &&
        new Date() <= end
      ) {
        role = "Representative";
        retired = false;
        break;
      } else if (politicians[poli_id].timeInCongress[i].position.toLowerCase() === "senate") {
        role = "Senator";
      } else if (politicians[poli_id].timeInCongress[i].position.toLowerCase() === "house") {
        role = "Representative";
      }
    }

    const retiredStyle= {
          backgroundColor: "blue"
      }
    const activeStyle= {
        backgroundColor: "white"
    }

    return (
    
      <div style= {retired ? retiredStyle : activeStyle}>
        <Header />
        <div className="flex w-full mt-4 lg:mb-4 lg:mt-8 justify-end lg:pl-16 lg:pr-16 lg:mb-8 h-10">
          <div className="mt-0.5 mr-2 flex items-center text-gray-600 font-semibold text-regular lg:text-lg">
            <span>Data Period</span>
          </div>
          <TileSelectBox
            onChange={setCurrentPeriod}
            defaultValue={current_period}
          />
        </div>
        <div className="h-fit lg:pl-16 lg:pr-16 lg:mb-16">
          <div className={tailwindGridRow} >
            <div className={tailwindTileStyles + "lg:col-start-1 lg:col-end-7"}>
              <PoliticianInfo poliId={poli_id} />
            </div>
            
            <div
              className={tailwindTileStyles + "lg:col-start-7 lg:col-end-11"}
            >
                <PowerInfo poliId={poli_id} />
            </div>

            <div
              className={tailwindTileStyles + "lg:col-start-11 lg:col-end-13"}

              
            >
              {/* Power Ideology */}
            </div>
            
          </div>
          <div className={tailwindGridRow}>
            <div className={tailwindTileStyles + "lg:col-start-1 lg:col-end-5"}>
              <IdeologyDistribution
                globalPeriod={current_period}
                poliId={poli_id}
              />
            </div>
            <div className={tailwindTileStyles + "lg:col-start-5 lg:col-end-9"}>
              <TopDonationsDollarsByIndustry
                globalPeriod={current_period}
                poliId={poli_id}
              />
            </div>
            <div
              className={tailwindTileStyles + "lg:col-start-9 lg:col-end-13"}
            >
              <TopDonationsDollarsByCorporation
                globalPeriod={current_period}
                poliId={poli_id}
              />
            </div>
          </div>
          <div className={tailwindGridRow}>
            <div className={tailwindTileStyles + "lg:col-start-1 lg:col-end-5"}>
              <TopDonationsDollarsByUniversity
                globalPeriod={current_period}
                poliId={poli_id}
              />
            </div>

            <div
              className={tailwindTileStyles + "lg:col-start-5 lg:col-end-9"}
            >
              <WealthInfo poliId={poli_id} />
            </div>

            <div
              className={tailwindTileStyles + "lg:col-start-9 lg:col-end-13"}
            ></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  } else {
    return <LoadingScreen />;
  }
}
