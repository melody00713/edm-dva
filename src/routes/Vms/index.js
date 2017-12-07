import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Button, Carousel, Spin } from 'antd';
import styles from './index.less';
import VmBox from './components/vmBox';
import { PAGE_SIZE, COL_COUNT, ROW_COUNT } from '../../constants';
import { sliceArray } from '../../assets/js/common';

const ButtonGroup = Button.Group;
class Vms extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'vms/fetch',
      payload: {
        count: PAGE_SIZE,
        domain: this.props.login.account.domain,
      },
    });
  }
  toggleListLayoutHandler = () => {
    this.props.dispatch({
      type: 'vms/setState',
      payload: {
        toggleListLayout: !this.props.vms.toggleListLayout,
      },
    });
  }
  render() {
    const { vms } = this.props;
    const PageArr = sliceArray(vms.list, ROW_COUNT * COL_COUNT);
    return (
      <div className={styles.normal}>
        <Spin spinning={vms.loading} tip="数据加载中...">
          <Row style={{height: '84px', lineHeight: '84px', position: 'relative'}}>
            <span style={{fontSize: '20px'}}>桌面列表 <span style={{color: '#b7b7b7'}}>({vms.list.length}台)</span> </span>
            <div className={styles.operation}>
              <ButtonGroup size="large">
                <Button icon="reload" />
                <Button type="primary" icon="caret-right" />
              </ButtonGroup>
              <Button size="large" icon="appstore" style={{ marginLeft: '16px' }} onClick={this.toggleListLayoutHandler} />
            </div>
          </Row>
          <Carousel ref="carousel">
            {
              PageArr.map((item, index) => {
                return (<div className={styles.carouselItem} key={index}><VmBox toggleListLayout={vms.toggleListLayout} list={item} /></div>);
               })
            }
          </Carousel>
        </Spin>
      </div>
    );
  }
}

export default connect(({ vms, login }) => ({ vms, login }))(Vms);
