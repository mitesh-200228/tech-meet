import React from 'react'
import Dashboard from './Dashboard'
import {
    Table,
    Thead, Flex,
    Tbody,
    Tfoot,
    Tr,
    Th, Text,
    Td,
    TableCaption,
} from '@chakra-ui/react'
import axios from 'axios';
import '../css/file.css';

const Grades = () => {
    const [userinfo, setUserInfo] = React.useState([]);
    const [gradesinfo, setGradesInfo] = React.useState([]);
    const [cnt, setCnt] = React.useState(1);
    React.useEffect(async () => {
        await axios.post('http://localhost:4000/getdatas1', {
            _id: localStorage.getItem('_id')
        }).then((response) => {
            setUserInfo(response.data.data.userinfo[0]);
            setGradesInfo(response.data.data.userinfo[1]);
        }).catch((error) => {
            console.log(error);
        })
    }, []);
    gradesinfo.shift();
    gradesinfo.shift();
    let op = 1;
    return (
        <Dashboard>
            <Table variant='simple'>
                <TableCaption>Grades for {userinfo[0]} are not changable</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Sr. No</Th>
                        <Th>Course Code</Th>
                        <Th>Course Name</Th>
                        <Th>Category</Th>
                        <Th>Credit</Th>
                        <Th>Grade</Th>
                        <Th>Att</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {gradesinfo.map((grade, index) => {
                        if (grade[0] === 'Registration for JAN-MAY 2022') {
                            return;
                        }
                        console.log(typeof parseInt(grade[0]), grade);
                        if (grade[0].includes('Credit')) {
                            return (
                                <Tr>
                                    <Td>{grade[0]}</Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td>{grade[1]}</Td>
                                    <Td>{grade[2]}</Td>
                                </Tr>
                            )
                        }
                        if (grade[0].includes('Summer') || grade[0].includes('Semester')) {
                            return (
                                <>
                                    <Flex className="bold" height={'100%'} justifyContent="center" alignItems={'center'}>
                                        {grade[0]}
                                    </Flex>
                                </>
                            )
                        }
                        if (parseInt(grade[0]) === op) {
                            op++;
                            return (
                                <Tr>
                                    <Td>{grade[0]}</Td>
                                    <Td>{grade[1]}</Td>
                                    <Td>{grade[2]}</Td>
                                    <Td>{grade[3]}</Td>
                                    <Td>{grade[4]}</Td>
                                    <Td>{grade[5]}</Td>
                                    <Td>{grade[6]}</Td>
                                </Tr>
                            )
                        }
                    })}
                </Tbody>
            </Table>
        </Dashboard>
    )
}

export default Grades