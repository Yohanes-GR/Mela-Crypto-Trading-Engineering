import React from 'react';
import 'antd/dist/antd.css';
import '../../index.css';
import { DashboardOutlined, FundProjectionScreenOutlined, FieldTimeOutlined, WalletOutlined, HistoryOutlined, UserOutlined, RocketOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const AppLayout = ({ children }) => {
  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      lable: 'Dashboard'
    },
    {
      key: 'Backtest',
      icon: <FieldTimeOutlined />,
      lable: 'Backtest'
    },
    {
      key: 'index-fund',
      icon: <FundProjectionScreenOutlined />,
      lable: 'Index Fund'
    },
    {
      key: 'portfolio',
      icon: <WalletOutlined />,
      lable: 'Portfolio'
    },
    {
      key: 'history',
      icon: <HistoryOutlined />,
      lable: 'History'
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      lable: 'Profile'
    }
  ];


  return (
    <Layout
    style={{ minHeight: '100vh' }}
    >
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" style={{
          display: "flex",
          alignItems: "baseline",
          padding: "5px",
          color: "white"
        }}>
          <RocketOutlined span style={{
            fontSize: "25px"
          }}/>
          <h1
            style={{
              color: "white",
              fontSize: "25px",
              paddingLeft: "5px",
              fontWeight: "bolder",
              letterSpacing: '3px'
            }}
          >MELA</h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['4']}
          items={menuItems.map(
            (item) => ({
              key: item.key,
              icon: item.icon,
              label: item.lable,
            }),
          )}
        />  
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 700,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Mela Crypto-Trading Engineering PLC ©2022
        </Footer>
      </Layout>
    </Layout>
  );
}
export default AppLayout;