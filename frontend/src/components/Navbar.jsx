import React from 'react'
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import {
    ChakraProvider,
    Box,
    Grid,
    theme,
} from '@chakra-ui/react';
const Navbar = () => {
    return (
        <>
            <ChakraProvider theme={theme}>
                <ColorModeSwitcher justifySelf="flex-end" />
            </ChakraProvider>
        </>
    )
}

export default Navbar