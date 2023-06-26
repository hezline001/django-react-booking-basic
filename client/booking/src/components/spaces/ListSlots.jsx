import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { green, red, yellow } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import LightOutlined from '../buttons/LightOutlined';
import { useSubmit } from 'react-router-dom';

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

export default function ListSlots({slots}) {
  return (
   <div className='mt-4 mx-2'>
      <Box sx={{ flexGrow: 1 }}>
      <Grid className='' container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {slots.map((slot) => (
          <Grid item xs={2} sm={4} md={3} key={slot.slot_id}>
            <SingleSlot singleSlot={slot}/>
          </Grid>
        ))}
      </Grid>
    </Box>
   </div>
    
  );
}


function SingleSlot({singleSlot}){
   let submit = useSubmit()
   let [slot,setSlot] = useState(singleSlot)
   useEffect(()=>{setSlot(singleSlot)},[singleSlot])
   let color 
   if(slot.status === 'empty'){
   color = green[100]
    return (
      <Item color={color}>
      <div className=' py-10'>
        <p>Slot - {slot.slot_id}</p>
        <br />
        'empty'

      </div>
      </Item>
    )
  }
  function handleAction(data){
      let formData = new FormData()
      formData.append('action',data.action)
      formData.append('id',data.id)
      submit(formData,{method:'POST'})
  }
  let actions
  if(slot.status === 'pending'){
   color = yellow[100]
   actions = <li className=" py-1">
               <div className="flex items-center justify-between">
                  <div className="">
                     <p className="text-sm text-gray-900">
                        Actions
                     </p>
                  </div>
                  <div className="capitalize text-gray-900">
                     <LightOutlined onClick={()=>{handleAction({action:'approve',id:slot.id})}} text={'Approve'}/> 
                     <LightOutlined onClick={()=>{handleAction({action:'reject',id:slot.id})}} text={'Reject'}/>
                  </div>
               </div>
            </li>
  }else if(slot.status === 'booked'){
   color = red[100]
   actions = <li className=" py-1">
   <div className="flex items-center justify-between">
      <div className="">
         <p className="text-sm text-gray-900">
            Actions
         </p>
      </div>
      <div className="capitalize text-gray-900">
         <LightOutlined onClick={()=>{handleAction({action:'clear',id:slot.id})}} text={'Clear slot'}/>
      </div>
   </div>
</li>
  }
  return(
    <>
      <Item color={color}>
      <ul className="max-w-md divide-y divide-gray-200 w-full ">
         <li className=" py-1 ">
         <p>Slot - {slot.slot_id}</p>
            <div className="flex items-center justify-between">
               <div className="">
                  <p className="text-sm text-gray-900">
                     Company
                  </p>
               </div>
               <div className="capitalize text-gray-900">
                  {slot.company_name}
               </div>
            </div>
         </li>
         <li className=" py-1">
            <div className="flex items-center justify-between">
               <div className="">
                  <p className="text-sm text-gray-900">
                     Booked by
                  </p>
               </div>
               <div className="capitalize text-gray-900">
                  {slot.user.username}
               </div>
            </div>
         </li>
         <li className=" py-1">
            <div className="flex items-center justify-between">
               <div className="">
                  <p className="text-sm text-gray-900">
                  Status
                  </p>
               </div>
               <div className="capitalize text-gray-900">
                  {slot.status}
               </div>
            </div>
         </li>
         {actions && actions}
      
      </ul>
      </Item>

    </>
  )
}