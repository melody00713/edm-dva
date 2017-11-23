import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import styles from './MainLayout.less';
// import Header from './Header';

const { Header, Content } = Layout;

function MainLayout({ children, pathName }) {
  console.log(children)
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.logo} />
        {/*<Menu*/}
          {/*theme="dark"*/}
          {/*mode="horizontal"*/}
          {/*defaultSelectedKeys={['2']}*/}
          {/*style={{ lineHeight: '64px', float: 'right' }}*/}
        {/*>*/}
          {/*<Menu.Item key="1">nav 1</Menu.Item>*/}
          {/*<Menu.Item key="2">nav 2</Menu.Item>*/}
          {/*<Menu.Item key="3">nav 3</Menu.Item>*/}
        {/*</Menu>*/}
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ padding: 24 }}>{children}</div>
      </Content>
    </Layout>
  );
}

export default MainLayout;
