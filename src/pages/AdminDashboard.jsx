import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  AppstoreAddOutlined,
  UnorderedListOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import AddProduct from './AddProduct';
import ViewProducts from './ViewProducts';
import ViewUsers from './ViewUsers';
import useWindowWidth from '../hooks/UseWindowwidth';

const { Header, Sider, Content } = Layout;

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('addProduct');

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'addProduct':
        return <AddProduct />;
      case 'viewProducts':
        return <ViewProducts />;
      case 'viewUsers':
        return <ViewUsers />;
      default:
        return <AddProduct />;
    }
  };

  // Use the custom hook to get the window width
  const windowWidth = useWindowWidth();
  const isLargeScreen = windowWidth >= 1000; // Define breakpoint for larger screens

  useEffect(() => {
    // Set collapsed state based on screen size
    if (isLargeScreen) {
        setCollapsed(false); 
    } else {
   
      setCollapsed(true);
    }
  }, [isLargeScreen]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed} theme="dark">
        <div className="logo text-white text-center py-4 text-2xl font-bold">
          Admin
        </div>
        <Menu
          theme="dark"
          selectedKeys={[selectedMenu]} // Highlight the selected menu item
          mode="inline"
          onClick={({ key }) => setSelectedMenu(key)} // Change the selected menu when clicked
        >
          <Menu.Item key="addProduct" icon={<AppstoreAddOutlined />}>Add Product</Menu.Item>
          <Menu.Item key="viewProducts" icon={<UnorderedListOutlined />}>View Products</Menu.Item>
          <Menu.Item key="viewUsers" icon={<UserOutlined />}>View Users</Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="bg-white flex justify-between items-center px-6 shadow-md">
          <div>
            {collapsed ? (
              <MenuUnfoldOutlined
                className="trigger text-xl"
                onClick={toggleCollapsed}
              />
            ) : (
              <MenuFoldOutlined
                className="trigger text-xl"
                onClick={toggleCollapsed}
              />
            )}
          </div>
        </Header>
        <Content style={{ margin: '16px' }}>
          <div
            className="bg-white p-6 rounded-lg shadow-md"
            style={{ minHeight: 360 }}
          >
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
