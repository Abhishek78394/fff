import * as  React from "react";
import { useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr, Box,
  Th,
  Td,
  TableContainer,
  ChakraProvider,
  Heading,
  Drawer,
} from '@chakra-ui/react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import axios from "axios";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { DateRangePicker } from 'react-date-range';
const Home = () => {
  const [data, setData] = React.useState([])
  const [apiData, setApiData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const cookies = new Cookies();
  const token = cookies.get('token')
  const sumbmitHandler = async (e) => {

    await axios.get(`http://localhost:4000/getdata?token=${token}`)
      .then((e) => {
        setApiData(e.data.products)
        setData(e.data.products)
        console.log(e.data.products)

      }).catch(error => {
        console.log(error)
      })
  }

  React.useEffect(() => {
    sumbmitHandler();
  }, [])
  const handleSelect = (date) => {
    let filtered = data.filter((product) => {
      let productDate = new Date(product["createdAt"]);
      return (productDate >= date.selection.startDate &&
        productDate <= date.selection.endDate);
    })
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setApiData(filtered);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  }
  console.log(apiData)
  return (
    <>
      <ChakraProvider>
        {/* <Box
          w="25vw"
          position={'fixed'}
          top="1"
          left="1"
           h='100vh' bg='red.50'
        >

        </Box> */}
        {/* <TableContainer w={40}> */}

        <Drawer placement="left"></Drawer>

        <Box w="70vw" textAlign={'center'} m="10">

          <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
          />
        </Box>
        {/* </TableContainer> */}



        <Box w="95vw" m="10">
          <TableContainer>
            <Heading my="8" textAlign={'center'} size={'lg'}>
              Total data is here
            </Heading>
            <Table variant='simple'>
              <Thead w="full"
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
              {apiData && apiData.map((e, i) => {
                let date = new Date(data["createdAt"]);
                return <Tbody>
                  {/* console.log(e.city) */}
                  <Tr>

                    <Td>{i + 1}</Td>
                    <Td>{e.unique_no}</Td>
                    <Td >{e.pieces}</Td>
                    <Td >{e.city}</Td>
                    <Td >{e.status}</Td>
                    <Td >{e.createdAt.split("T")[0]}</Td>

                  </Tr>
                </Tbody>
              })}




            </Table>

          </TableContainer>
        </Box>
      </ChakraProvider>


    </>
  )
}

export default Home