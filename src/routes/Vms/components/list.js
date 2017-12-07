import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button, Icon } from 'antd';
import styles from './list.less';
import { PAGE_SIZE } from '../../../constants';

class VmsList extends Component {
  constructor(props) {
    super(props);
  }
// function VmsList({ dispatch, list: dataSource, total, page: current, loading }) {
  deleteHandler = (id) => {
    this.props.dispatch({
      type: 'users/remove',
      payload: id,
    });
  }
  pageChangeHandler = (page) => {
    this.props.dispatch({
      type: 'vms/fetch',
      payload: { page },
    });
  }
  editHandler = (id, values) => {
    this.props.dispatch({
      type: 'users/patch',
      payload: { id, values },
    });
  }
  render() {
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作系统',
        dataIndex: 'os',
        key: 'os',
        render: (record) => {
          return (<span><i className={`${styles.osIcon}`} />{record}</span>);
        },
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (record) => {
          return (<span><i className={`${styles.status} + ' ' + ${styles[record]}`} />{record === 'on' ? '开机' : '关机'}</span>);
        },
      },
      {
        title: 'CPU（核）',
        dataIndex: 'cpu',
        key: 'cpu',
      },
      {
        title: '内存（GB）',
        dataIndex: 'memory',
        key: 'memory',
      },
      {
        title: '创建时间',
        dataIndex: 'createtime',
        key: 'createtime',
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
    const { list } = this.props;
    return (
      <div className={styles.normal}>
        <Table
          columns={columns}
          dataSource={list}
          rowKey={record => record.id}
          pagination={false}
        />
      </div>
    );
  }
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

export default connect(({ vms, loading }) => ({ vms, loading }))(VmsList);
