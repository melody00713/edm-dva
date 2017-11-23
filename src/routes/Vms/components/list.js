import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
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
    },
    {
      title: '操作系统',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '状态',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'CPU（核）',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '内存（GB）',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '创建时间',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a>Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <Table
        bordered
        columns={columns}
        dataSource={dataSource}
        rowKey={record => record.id}
        loading={loading}
        pagination={false}
      />
      <Pagination
        className="ant-table-pagination"
        total={total}
        current={current}
        pageSize={PAGE_SIZE}
        onChange={pageChangeHandler}
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
