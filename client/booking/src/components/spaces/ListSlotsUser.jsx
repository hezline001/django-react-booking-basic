import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { green, red, yellow } from '@mui/material/colors';
import { useContext, useEffect, useState } from 'react';
import LightOutlined from '../buttons/LightOutlined';
import {SelectedSlotsCxt,DispatchContext} from '../../store/SelectedContext'

const Item = styled(Paper)(({ theme,color }) => ({
    backgroundColor: color,
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    color: theme.palette.text.secondary,
  }));
  
  export default function ListSlotsUser({slots}) {
  
    return (
        <div className='mx-2'>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {slots.map((slot) => (
                    <Grid  item xs={2} sm={4} md={3} key={slot.slot_id}>
                    <SingleSlotUser slot={slot} />
                    </Grid>
                ))}
                </Grid>
            </Box>
        </div>
      
    );
  }
  
function SingleSlotUser({slot}){
    let dispatch = useContext(DispatchContext)
    let selectedSlots = useContext(SelectedSlotsCxt)
    let [slott,setSlott] = useState(slot)
    useEffect(()=>{setSlott(slot)},[slot])
    let color
    if(slott.status === 'pending'){
        color = yellow[100]
    }else if(slott.status === 'empty'){
        color = green[100]
    }else{
        color = red[100]
    }
    let [selected,setSelected] =  useState(false)

    useEffect(()=>{if(selectedSlots.length == 0){setSelected(false)}},[selectedSlots])
    let border
    if(selected){
        border = 'p-1 bg-black rounded-md'
    }else{
        border = 'p-1 bg-white rounded-md'
    }
    let item

    if(slott.status === 'empty'){
        item = <div className={border}>
                    <Item className={border} onClick={()=>{setSelected(!selected);if(!selected){dispatch({type:'added',id:slott.slot_id})}else{dispatch({type:'removed',id:slott.slot_id})}}} color={color}>
                    <div>Slot {slott.slot_id}</div>
                    </Item>
                </div>
                
    }else{
        item = <div>
                    <Item className={border} color={color}>
                    <div>Slot {slott.slot_id}</div>
                    </Item>
                </div>
        
        
    }
    return(
        <>
        {item}
        </>
    )
}