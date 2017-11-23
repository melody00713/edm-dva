import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Progress } from 'antd';
import styles from './PowerModal.less';

class PowerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 60,
    };
  }
  hideModalHandler = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'app/hidePowerModal',
    });
  }
  operationPower = (value) => {
    console.log(value)
    const { dispatch } = this.props;
    // this.setState({
    //   time: 60,
    // });
    dispatch({
      type: 'app/showPowerModal',
      payload: {
        powerType: value,
      },
    });
  }
  calcTimeHandler = () => {
    // if (this.state.time === 0) {
    //   return 0;
    // } else {
    //   setTimeout(() => {
    //     this.setState({
    //       time: this.state.time - 1,
    //     });
    //     this.calcTimeHandler();
    //   }, 1000);
    // }
  }
  render() {
    const { powerVisible, powerType } = this.props;
    return (
      <div className={styles.powerModal} style={{ visibility: powerVisible === false ? 'hidden': 'visible' }}>
        <div className={styles.powerModalMask}>
          <Row type="flex" justify="space-around" align="middle" style={{ height: '100%', width: '60%', margin: '0 auto' }}>
            <Col span={4}>
              <Progress type="circle" width={180} strokeWidth={4} percent={this.state.time} format={percent => `${(percent / 100 * 60)} 秒重启`} />
            </Col>
            <Col span={4}>
              <Progress type="circle" width={180} strokeWidth={4} percent={this.state.time} format={percent => `${(percent / 100 * 60)} 秒 关机`} />
            </Col>
            <Col span={4}>
              <a>
                <Progress type="circle" width={180} strokeWidth={4} percent={0} format={() => '取消'} onClick={this.hideModalHandler} />
              </a>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { visible, type } = state.app;
  return {
    visible,
    type,
  };
}

export default connect(mapStateToProps)(PowerModal);

