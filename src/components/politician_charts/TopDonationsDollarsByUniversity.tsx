import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from "recharts";
import { addPoliticianPeriod } from "../../store/actions/politicianActionCreators";
import * as format from "../../helper/formatting";
import { extra_colors } from "../../constants/graph_colors";
import { graph_colors } from "../../constants/graph_colors";
import TileLoading from "../TileLoading";
import { DataState } from "../../interfaces/global.interface";
import {
  Politician,
  UniversityDonation,
} from "../../interfaces/politician.interface";
import {
  IdeologyScore,
  University,
} from "../../interfaces/university.interface";
import TileTitle from "../TileTitle";
import UniversityMain from "../../pages/UniversityMain";
import { uniData } from "../TempData";
import customLabel from "../CustomHyperlinkLabel";
import { Link } from "react-router-dom";
import CustomHyperlinkLabel from "../CustomHyperlinkLabel";

export default function TopDonationsDollarsByUniversity(props: any) {
  const [localPeriod, setLocalPeriod] = useState(props.globalPeriod);

  // Set up dispatch to be able to add local periods
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    // Check if we need to fetch a new period for this politician
    if (
      localPeriod !== props.globalPeriod &&
      !(localPeriod in politicians[props.poliId].periods)
    ) {
      dispatch(addPoliticianPeriod(props.poliId, localPeriod));
    }
  }, [localPeriod]);

  // Access the redux store
  const politicians: Record<number, Politician> = useSelector(
    (state: DataState) => state.politicians
  );

  // Ensure that this periods data has been successfully loaded into the redux store
  if (
    localPeriod in politicians[props.poliId].periods &&
    politicians[props.poliId].periods[localPeriod]
      .topDonationsDollarsByUniversity.length > 0
  ) {
    // Data to feed the graph
    const data = politicians[props.poliId].periods[
      localPeriod
    ].topDonationsDollarsByUniversity.sort(
      (a: UniversityDonation, b: UniversityDonation): number => {
        if (a.dollars_donated < b.dollars_donated) {
          return 1;
        }
        if (a.dollars_donated > b.dollars_donated) {
          return -1;
        }
        return 0;
      }
    );
    console.log(data)
    //Custom bar style for the graph
    // const CustomBar = (props: any) => {
    //   const color_index = props.index % extra_colors.length;
    //   return <Rectangle {...props} fill={extra_colors[color_index]} />;
    // };

     // Custom bar style for the graph
  const CustomBar = (props: any) => {

    const temp:number =15;

    let fill;
    if (temp<-0.18) {
      fill = graph_colors.democratic;
    } else if (temp>.71) {
      fill = graph_colors.republican;
    } else {
      fill = graph_colors.independent;
    }

    //use explicit fill here, or use the additional css class and make a css selector to update fill there
    return <Rectangle {...props} fill={fill} />;
  };

   

    const CustomTooltip = ({ active, payload }: any) => {
      if (!active) {
        return null;
      }
      const data = payload[0].payload;
      return (
        <div className={"bg-tooltipBack p-4 opacity-90 rounded-2xl"}>
          Received: ${format.formatNumber(data.dollars_donated)}
        </div>
      );
    };
    console.log(data)
    return (
      <div className="h-full w-full">
        <TileTitle
          //title="Top University Receipts" 
          title="Top University Donors" 
          selectFunction={setLocalPeriod}
          localPeriod={localPeriod}
          fakeData
        />
        <ResponsiveContainer
          width="100%"
          height="85%"
          className="text-xs lg:text-base"
          >    
          <BarChart
            data={data}
            layout="vertical"
            barCategoryGap={0}
            barSize={40}
            margin={{ top: 5, right: 30, left: 10, bottom: -10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              tickFormatter={(value) => {
                return "$" + value;
              }}
            />
            <YAxis type="category" width={150} dataKey="university"  /> 
            <Tooltip content={CustomTooltip} />
            {/* <Bar 
            dataKey="dollars_donated" 
            shape={CustomBar} 
            label={CustomHyperlinkLabel}  />   */}
            
            <Bar 
            dataKey="dollars_donated" 
            shape={CustomBar} 
            label={(props:any):any =>{
              console.log(props);
              const labelData = {
                name: "University of Pennsylvania", // DUMMY DATA NEED TO replace with code below
                id:"9", 
                linkTo:"universities"

                // name: data[props.index].university,
                // id:props.index.toString(),
                // linkTo:"universities"
              };
              return CustomHyperlinkLabel(props,labelData);
            }}/> 


          </BarChart>
        </ResponsiveContainer>
      </div>
      // label={customLabel}
    );
  } else {
    return (
      <div className="h-full w-full">
        <TileTitle
          title="Top University Receipts"
          selectFunction={setLocalPeriod}
          localPeriod={localPeriod}
          fakeData
        />
        <div className="h-full flex content-center justify-center items-center">
          {localPeriod in politicians[props.poliId].periods ? (
            <div>No data for this period...</div>
          ) : (
            <TileLoading />
          )}
        </div>
      </div>
    );
  }
}
