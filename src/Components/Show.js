import React, {useEffect} from "react";
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

export default function Show() {
  const [data, setData] = React.useState([])
  const cookies = new Cookies();
  const token = cookies.get('token')
  const sumbmitHandler = async (e) => {
   console.log(token)
     await axios.get(`http://localhost:4000/getdata?token=${token}`)
      .then((e) => {

       setData(e.data.products)
        console.log(e.data.products)
        
      }).catch(error => {
        console.log(error)
      })
    }

    useEffect(() => {
      sumbmitHandler();
    }, [])

    return (
      <ChakraProvider>
       <Box w="90vw" m="10"> 
      <TableContainer>
      <Heading my="8" textAlign={'center'} size={'lg'}>
   Total data is here
  </Heading>
  <Table variant='simple'>
    <Thead  w="full"
        bg="yellow.400"
        p="4"
        css={{ borderRadius: '8px 8px 0 0' }}>
      <Tr>
        <Th>No.</Th>
        <Th>unique_no</Th>
        <Th>pieces</Th>
        <Th>City</Th>
        <Th>Status</Th>
        <Th>Create Time</Th>
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