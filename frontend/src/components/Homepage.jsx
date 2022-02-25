import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,Image,
    Button,theme,
    Heading,
    Text,
} from '@chakra-ui/react';
import axios from 'axios';
import React from 'react'
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import grade1 from '../images/grade1.png';
import grade from '../images/grade.png';
import { useColorModeValue } from "@chakra-ui/color-mode";
import {useHistory} from 'react-router-dom';
export default function SimpleCard() {
    const theme = useColorModeValue("white","black");
    const history = useHistory();
    const [UserDatas,setUserData] = React.useState({
        rollno:"",pwd:""
    });
    const change = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUserData({...UserDatas,[name]: value});
    }

    const fireFunctions = async(e) => {
        try {
            await axios.post('http://localhost:4000/getdatas',{
                rollno:UserDatas.rollno,pwd:UserDatas.pwd
            }).then((response) => {
                console.log(response.data.data);
                localStorage.setItem('_id',response.data.data);
                history.push('/dashboard');
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Flex flexDirection={'column'}>
            <Flex bg={useColorModeValue('gray.50', 'gray.800')} justifyContent="flex-end" p={2} width="100%">
                <ColorModeSwitcher justifySelf="flex-end" />
            </Flex>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Sign in to view Your Grades</Heading>
                    </Stack>

                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="rollno">
                                <FormLabel>Roll No.</FormLabel>
                                <Input type="text" onChange={change} value={UserDatas.rollno} name="rollno" type="text" />
                            </FormControl>
                            <FormControl id="pwd">
                                <FormLabel>Password</FormLabel>
                                <Input type="password" onChange={change} value={UserDatas.pwd} name="pwd" type="password" />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                </Stack>
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    onClick={fireFunctions}
                                    >
                                    Sign in
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
                {theme !== 'white' ? (
                    <>
                <Image src={grade1} width="400px"></Image>
                    
                    </>
                ):(
                    <>
                <Image src={grade} width="400px"></Image>
                    
                    </>
                )}
            </Flex>
        </Flex>
    );
}