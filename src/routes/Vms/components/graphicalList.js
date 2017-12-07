import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import styles from './graphicalList.less';
import GraphicalBox from './graphicalCard';
import { PAGE_SIZE, COL_COUNT } from '../../../constants';


class GraphicalList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const list = this.props.list;
    const count = list.length > COL_COUNT ? COL_COUNT : list.length;
    return (
      <Row type="flex" align="middle" gutter={23}>
        {
          list.map((item, index) => {
            return <Col key={index} span={24 / count}><GraphicalBox data={item} index={index} /></Col>;
          })
        }
      </Row>
    );
  }
}

export default connect(({ vms }) => ({ vms }))(GraphicalList);
