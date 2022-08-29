import React from "react";
import { GiPublicSpeaker } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DataState } from "../../interfaces/global.interface";
import { Politician } from "../../interfaces/politician.interface";
import { ordinalSuffixOf } from "../../helper/formatting";

export default function PoliticianInfo(props: any) {
  // Access the redux store
  const politicians: Record<number, Politician> = useSelector(
    (state: DataState) => state.politicians
  );

  // Get politician age from DOB
  const getAge = (dob: string) => {
    const today = new Date();
    const bday = new Date(dob);
    let age = today.getFullYear() - bday.getFullYear();
    const m = today.getMonth() - bday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < bday.getDate())) {
      age--;
    }
    return age;
  };

  const poli = politicians[props.poliId];

  // Compute politicians time in congress
  let timeInCongress = 0;
  for (let i = 0; i < poli.timeInCongress.length; i++) {
    const start = new Date(poli.timeInCongress[i].startdate);
    const end = new Date(poli.timeInCongress[i].enddate);
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
  for (let i = 0; i < poli.timeInCongress.length; i++) {
    const start = new Date(poli.timeInCongress[i].startdate);
    const end = new Date(poli.timeInCongress[i].enddate);
    if (
      poli.timeInCongress[i].position.toLowerCase() === "senate" &&
      start <= new Date() &&
      new Date() <= end
    ) {
      role = "Senator";
      retired = false;
      break;
    } else if (
      poli.timeInCongress[i].position.toLowerCase() === "house" &&
      start <= new Date() &&
      new Date() <= end
    ) {
      role = "Representative";
      retired = false;
      break;
    } else if (poli.timeInCongress[i].position.toLowerCase() === "senate") {
      role = "Senator";
    } else if (poli.timeInCongress[i].position.toLowerCase() === "house") {
      role = "Representative";
    }
  }
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


  //const temp =
  //  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  return (
    <div className="lg:pt-2 pl-8 pr-8 flex flex-col overflow-y-auto">
      <div className="flex items-center">
        {/* <GiPublicSpeaker size={85} className="mr-6" /> */}
        {/* <img src={require("../../images/deletelatercat.jpg")}/> */}
        <img
        src="https://hips.hearst
        apps.com/hmg-prod.s3.amazonaws.com/images/little-cute-maltipoo-puppy-royalty-free-image-1652926025.jpg?crop=0.444xw:1.00xh;0.129xw,0&resize=980:*"
        alt="car"
        width={80}
      />
        <div className="mb-0.5">
          <div className="text-xl lg:text-4xl font-bold mb-0.5">
            {poli.name}
          </div>
          <div className="text-gray-600 text-xs lg:text-base">
            {getAge(poli.dob) +
              " Years Old" +
              " ‧ " +
              timeInCongress +
              " Years in Congress"}
          </div>
          <div className="text-gray-600 text-xs lg:text-base">
            {poli.schoolInfo && poli.schoolInfo.length > 0 ? (
              <div>
                <span>Graduate from </span>
                <Link to={"/universities/" + poli.school} className="underline">
                  {poli.schoolInfo[0].name +
                    " (#" +
                    poli.schoolInfo[0].rank +
                    ")"}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="text-lg lg:text-xl text-gray-600 lg:mt-3">
        {retired ? "Former " : null}
        {poli.party.toLowerCase() === "democratic" ? (
          <span className="text-blue font-semibold">
            {poli.party.charAt(0).toUpperCase() + poli.party.slice(1)}
          </span>
        ) : poli.party.toLowerCase() === "republican" ? (
          <span className="text-red font-semibold">
            {poli.party.charAt(0).toUpperCase() + poli.party.slice(1)}
          </span>
        ) : (
          <span className="text-gray-600 font-semibold">
            {poli.party.charAt(0).toUpperCase() + poli.party.slice(1)}
          </span>
        )}
        {" " + role}
        {poli.state ? <span> from <span className="text-gray-600 font-semibold">{poli.state.toUpperCase()}</span></span> : null}
      </div>
      <div>
        <div className="mt-2 lg:mb-1 lg:mt-1 text-base lg:text-lg text-gray-600">
          {poli.senate_exit_reason
            ? poli.senate_exit_reason
            : poli.house_exit_reason}
        </div>
      </div>
      <div className="mt-2 lg:mb-2 lg:mt-4 text-sm lg:text-base text-gray-600">
        {/* {temp} */}
    

        {/* Copied From Power Tile  Time in Senate and in House */}
        <div className="flex justify-between">
        <div>
          <div className="text-base lg:text-lg font-light leading-none">
            Time in Senate is {timeInSenate} and time in house is {timeInHouse}.
          </div>
        </div>
        </div>




        {/* {poli.description} */}
      </div>
    </div>
  );
}
