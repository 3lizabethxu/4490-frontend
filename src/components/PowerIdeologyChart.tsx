
import { ScatterChart, Scatter, XAxis, 
    YAxis, CartesianGrid,Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';
           
export default function PowerIdeologyChart(props: any) {
    const data = [{ x: -100, y: -200, z: 200 }, { x: 120, y: 100, z: 260 },
        { x: 170, y: 300, z: 400 }, { x: -140, y: -250, z: 280 },
        { x: 150, y: 400, z: 500 }, { x: 110, y: 280, z: 200 }]

    return(
         <ResponsiveContainer
          width="100%"
          height="85%"
          className="text-xs lg:text-base"
        >
        <ScatterChart width={350} height={350} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid />
        <XAxis hide dataKey={'x'} type="number" name='Power' unit='Points' />
        <YAxis hide dataKey={'y'} type="number" name='Ideology' unit='Points' />
        <Scatter name='A school' data={data} fill='#8884d8' />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <ReferenceLine y={0} stroke="#000000" />
        <ReferenceLine x={0} stroke="#000000" />
        </ScatterChart>
        </ResponsiveContainer>
    )
  
  
  }
  