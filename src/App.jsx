import Layout from '@src/pages/layout/Layout.jsx';
import LayoutWithoutSideBar from '@src/pages/layout/LayoutWithoutSideBar.jsx';
import { Route, Routes } from 'react-router-dom';
import MainPage from '@src/pages/MainPage.jsx';
import InfoBoard from '@src/pages/InfoBoard.jsx';

function App () {
  
  return (
    
    <Routes>
      <Route path={'/'} element={<LayoutWithoutSideBar />}>
        <Route path={''} element={<MainPage />}></Route>
      </Route>
      <Route path={'/info/'} element={<Layout />}>
        <Route path={''} element={<MainPage />}></Route>
      </Route>
      <Route path={'/board'} element={<Layout />}>
        <Route path={''} element={<InfoBoard />}></Route>
      </Route>
    </Routes>
  
  )
    ;
}

export default App;
