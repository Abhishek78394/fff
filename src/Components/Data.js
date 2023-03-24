import * as React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,Box,
  Th,
  Td,
  TableContainer,
  ChakraProvider,
  Heading,
} from '@chakra-ui/react'

import axios from "axios";
import Cookies from "universal-cookie";

export default function Data() {
  const [data, setData] = React.useState([])
  const cookies = new Cookies();
  const token = cookies.get('token')

  console.log(token)
  const sumbmitHandler = async (e) => {
   console.log(token)
   const api = process.env.REACT_APP_API_URL ;

     await axios.get(`${api}/getdata?token=${token}`)
      .then((e) => {
        const d = e.data.products
       console.log(e)
       const a= d.filter((e)=>{
          const today = new Date();
          const yyyy = today.getFullYear();
          let mm = today.getMonth() + 1;
          if (mm < 10) mm = '0' + mm;
          const dateNow = yyyy+"-"+mm;
          const createDate = e.createdAt.split("T")[0].slice(0, 7);
        //   if(dateNow===createDate){
        // console.log(e)

        //   }
          return dateNow===createDate;

       })
       console.log(a)
        setData(a)
      }).catch(error => {
        console.log(error)
      })
    }

    React.useEffect(() => {
      sumbmitHandler();
    }, [])

    return (
      <ChakraProvider>
       <Box w="90vw" m="10"> 
    
      <TableContainer>
      <Heading my="8" textAlign={'center'} size={'lg'}>
 This Month data is here
  </Heading>
  <Table variant='simple'>
    <Thead  w="full"
        bg="yellow.500"
        p="4"
        color="#fff"
        css={{ borderRadius: '8px 8px 0 0' }}>
      <Tr >
        <Th color="#fff">No.</Th>
        <Th color="#fff">C_node_no</Th>
        <Th color="#fff">pieces</Th>
        <Th color="#fff">City</Th>
        <Th color="#fff">Status</Th>
        <Th color="#fff">Create Time</Th>
      </Tr>
    </Thead>
      {data && data.map((e,i)=>{
       
        return<Tbody>
        {/* console.log(e.city) */}
      <Tr>

<Td>{i+1}</Td>
<Td>{e.unique_no}</Td>
<Td >{e.pieces}</Td>
<Td >{e.city}</Td>
<Td >{e.status}</Td>
<Td >{e.createdAt.split("T")[0] }</Td> 

      </Tr> 
    </Tbody>
      })}

    
     
    
  </Table>

</TableContainer>
</Box>
      </ChakraProvider>
    );
  }