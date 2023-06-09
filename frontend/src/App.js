//import * as React from 'react';
import Box from '@mui/material/Box';
import GridTemplateAreas from './components/GridTemplateAreas';
import PublicDestination from './components/PublicDestination';
import PrivateDestination from './components/PrivateDestination';
import {Route, Routes} from 'react-router-dom';
import UpdatePage from './UpdatePage';
import Register from './RegisterPage';
import Login from './LoginPage';
import BucketListGridTemplateAreas from './components/BucketListGridTemplateAreas';
import PrivateDestinationGridTemplateAreas from './components/PrivateDestinationGridTemplateAreas';
import PublicDestinationUser from './components/PublicDestinationUser';
import BucketListPublicDestination from './components/BucketListPublicDestination';
import BucketListPrivateDestination from './components/BucketListPrivateDestination';
import UpdatePrivateDestination from './components/UpdatePrivateDestination'
import AddCheckinCheckout from './components/AddCheckinCheckout';
import AddPublicDestination from './components/AddPublicDestination';
import AddPrivateDestination from './components/AddPrivateDestination';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<GridTemplateAreas/>}></Route>
      <Route path="/publicDestinations/:id" element={<PublicDestination/>}></Route>
      <Route path="/publicDestinationsUser/:id" element={<PublicDestinationUser/>}></Route>
      <Route path="/updatePublicDestination/:id" element={<UpdatePage/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/bucketList/:id" element={<BucketListGridTemplateAreas/>}></Route>
      <Route path="/privateDestinations/:id" element={<PrivateDestination/>}></Route>
      <Route path="/privateDestinationList/:id" element={<PrivateDestinationGridTemplateAreas/>}></Route>
      <Route path="/bucketListPrivateDestination/:id" element={<BucketListPrivateDestination/>}></Route>
      <Route path="/bucketListPublicDestination/:id" element={<BucketListPublicDestination/>}></Route>
      <Route path="/updatePrivateDestination/:id" element={<UpdatePrivateDestination/>}></Route>
      <Route path="/addCheckinCheckout/:id" element={<AddCheckinCheckout/>}></Route>
      <Route path="/addPublic" element={<AddPublicDestination/>}></Route>
      <Route path="/addPrivate" element={<AddPrivateDestination/>}></Route>
    </Routes>
  );
}