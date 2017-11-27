import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import styles from './graphicalList.less';
import GraphicalBox from './graphicalCard';
import { PAGE_SIZE } from '../../../constants';

class GraphicalList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { list } = this.props.vms;
    return (
      <Row type="flex" justify="space-around" gutter={23}>
        {
          list.map((item, index) => {
            return <Col span={8} key={index}><GraphicalBox data={item} index={index} /></Col>;
          })
        }
      </Row>
    );
  }
}

export default connect(({ vms }) => ({ vms }))(GraphicalList);
