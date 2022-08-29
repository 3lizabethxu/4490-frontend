import GaugeChart from 'react-gauge-chart'
import { ResponsiveContainer } from 'recharts'
import CustomHyperlinkLabel from "./CustomHyperlinkLabel";

export default function PowerGaugeMeter(props: any) {

  return(
    
    <ResponsiveContainer>
      
      <GaugeChart 
        id="gauge-chart2" 
        nrOfLevels={20} 
        // percent={0.86} 
        colors={["#808080", "#000000"]}
        textColor={"#000000"}
        formatTextValue = {(props:any):any =>{
          console.log(props);
          const labelData = {
            name: "University of Pennsylvania", // DUMMY DATA NEED TO replace with code below
            id:"9", 
            linkTo:"universities"
          };
          return CustomHyperlinkLabel(props,labelData);
        }} 
      />
      
    </ResponsiveContainer>
  

)

}
