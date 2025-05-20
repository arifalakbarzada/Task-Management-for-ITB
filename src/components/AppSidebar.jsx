import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

import { AppSidebarNav } from './AppSidebarNav';
import img from  './../assets/brand/logo.png' 
import navigation from '../_nav';
import { userNav } from '../_nav';

import { setState } from '../store';

const AppSidebar = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.app.sidebarShow);
  const sidebarUnfoldable = useSelector((state) => state.app.sidebarUnfoldable);
  const user = useSelector((state)=>state.users.user)
  const toggleSidebar = (visible) => {
    dispatch(setState({ sidebarShow: visible }));
  };

  const toggleUnfoldable = () => {
    dispatch(setState({ sidebarUnfoldable: !sidebarUnfoldable }));
  };

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={sidebarUnfoldable}
      visible={sidebarShow}
      onVisibleChange={toggleSidebar}
    >
      <CSidebarHeader className="border-bottom d-flex align-items-center">
        <CSidebarBrand to="/">
          {/* <CIcon customClassName="sidebar-brand-full" icon={'./../src/brand/logo.png'} height={32} /> */}
          <img src={img} alt="hgbwjed" />
          {/* <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} /> */}
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => toggleSidebar(false)}
        />
      </CSidebarHeader>

      <AppSidebarNav items={user?.role === 'admin' ? navigation : user?.role === 'user' ? userNav : []} />

      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler onClick={toggleUnfoldable} />
      </CSidebarFooter>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
