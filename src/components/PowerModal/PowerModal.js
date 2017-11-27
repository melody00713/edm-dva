import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Progress } from 'antd';
import styles from './PowerModal.less';

class PowerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 44,
    };
  }
  hideModalHandler = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'app/hidePowerModal',
    });
  }
  operationPower = (value) => {
    const { dispatch } = this.props;
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
  calcPercentHandler = (type, percent) => {
    console.log(type)
    let _name = type === 'reboot' ? '重启' : '关机';
    if (type === this.props.powerType) {
      return (
        <div style={{ fontSize: '16px'}}><p style={{ fontSize: '34px', marginBottom: '10px' }}>{`${parseInt(percent / 100 * 60)}`}<small style={{ marginLeft: '10px' , fontSize: '18px'}}>s</small></p>{`${_name}`}</div>
      );
    } else {
      return `${_name}`;
    }
  }
  render() {
    const { powerVisible, powerType } = this.props;
    return (
      <div className={styles.powerModal} style={{ visibility: powerVisible === false ? 'hidden': 'visible' }}>
        <div className={styles.powerModalMask}>
          <Row type="flex" justify="space-around" align="middle" style={{ height: '100%', width: '60%', margin: '0 auto' }}>
            <Col span={4}>
              <Progress className={powerType === 'reboot' ? 'active' : ''} type="circle" width={180} strokeWidth={4} percent={powerType === 'reboot' ? this.state.time / 60 * 100 : 0} format={this.calcPercentHandler.bind(null, 'reboot')} />
            </Col>
            <Col span={4}>
              <Progress className={powerType === 'off' ? 'active' : ''} type="circle" width={180} strokeWidth={4} percent={powerType === 'off' ? this.state.time / 60 * 100 : 0} format={this.calcPercentHandler.bind(null, 'off')} />
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

