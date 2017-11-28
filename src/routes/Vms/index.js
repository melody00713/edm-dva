import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Button, Carousel } from 'antd';
import styles from './index.less';
import VmBox from './components/vmBox';

const ButtonGroup = Button.Group;
class Vms extends Component {
  constructor(props) {
    super(props);
  }
  pageChangeHandler = () => {
    this.props.dispatch({
      type: 'vms/fetch',
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
    return (
      <div className={styles.normal}>
        <Row style={{height: '84px', lineHeight: '84px', position: 'relative'}}>
          <span style={{fontSize: '20px'}}>桌面列表 <span style={{color: '#b7b7b7'}}>({vms.list.length}台)</span> </span>
          <div className={styles.operation}>
            <ButtonGroup size="large">
              <Button icon="reload" />
              <Button type="primary" icon="caret-right" />
            </ButtonGroup>
            <Button size="large" icon="appstore" style={{marginLeft: '16px'}} onClick={this.toggleListLayoutHandler} />
          </div>
        </Row>
        <Carousel afterChange={this.pageChangeHandler}>
          <div className={styles.carouselItem}><VmBox toggleListLayout={vms.toggleListLayout} /></div>
        </Carousel>
      </div>
    );
  }
}

export default connect(({ vms }) => ({ vms }))(Vms);
