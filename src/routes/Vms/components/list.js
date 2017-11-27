import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button, Icon } from 'antd';
// import { routerRedux } from 'dva/router';
// import qs from 'query-string';
import styles from './list.less';
import { PAGE_SIZE } from '../../../constants';


function VmsList({ dispatch, list: dataSource, total, page: current, loading }) {
  function deleteHandler(id) {
    dispatch({
      type: 'users/remove',
      payload: id,
    });
  }
  function pageChangeHandler(page) {
    // dispatch(routerRedux.push({
    //   pathname: '/users',
    //   search: qs.stringify({ page }),
    // }));
    dispatch({
      type: 'vms/fetch',
      payload: { page },
    });
  }
  function editHandler(id, values) {
    dispatch({
      type: 'users/patch',
      payload: { id, values },
    });
  }
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: () => {
        return 'QA测试机001';
      },
    },
    {
      title: '操作系统',
      dataIndex: 'phone',
      key: 'phone',
      render: () => {
        return (<span><i className={`${styles.osIcon}`} />Ubuntu</span>);
      },
    },
    {
      title: '状态',
      dataIndex: 'username',
      key: 'username',
      render: () => {
        return (<span><i className={`${styles.status} + ' ' + ${styles.on}`} />开机</span>);
      },
    },
    {
      title: 'CPU（核）',
      dataIndex: 'id',
      key: 'id',
      render: () => {
        return '2核';
      },
    },
    {
      title: '内存（GB）',
      dataIndex: 'email',
      key: 'email',
      render: () => {
        return '4GB';
      },
    },
    {
      title: '创建时间',
      dataIndex: 'website',
      key: 'website',
      render: () => {
        return '2018-01-01';
      },
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <Icon type="calculator" style={{fontSize: '20px', cursor: 'pointer'}} />
          <Icon type="ellipsis" className={styles.ellipse} />
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={record => record.id}
        loading={loading}
        pagination={false}
      />
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.vms;
  return {
    loading: state.loading.models.vms,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(VmsList);
