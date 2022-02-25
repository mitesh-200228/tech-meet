import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Grades from './components/Grades';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh">
          <BrowserRouter>
            {/* <Navbar/> */}
            <Switch>
              <Route path="/" exact>
                <Homepage/>
              </Route>
              <Route path="/dashboard" exact>
                <Grades/>
              </Route>
            </Switch>
          </BrowserRouter>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
