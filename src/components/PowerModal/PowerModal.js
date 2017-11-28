import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Progress } from 'antd';
import CircleProgress from '../CircleProgress/CircleProgress';
import styles from './PowerModal.less';

class PowerModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      delayTimer: 44,
      activeOperation: null, // 0 - 取消 1- 关机 2 - 重启
      hidden: false,
    };
  }
  componentWillUpdate(state, props) {
    if (state.powerVisible && !props.hidden) {
      this.calcDelayTimer();
      this.setState({
        hidden: true,
      });
    }
    if (!state.powerVisible && props.hidden) {
      clearInterval(this.interval);
      this.setState({
        hidden: false,
      });
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  calcDelayTimer = () => {
    let delayTimer = 59;
    this.setState({ delayTimer });
    this.interval = setInterval(() => {
      delayTimer -= 1;
      this.setState({ delayTimer });
      if (delayTimer === 0) {
        this.powerHandler();
      }
    }, 1000);
  }
  hideModalHandler = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'app/hidePowerModal',
    });
  }
  operationPower = (value) => {
    this.setState({
      activeOperation: value,
    });
    this.props.dispatch({
      type: 'app/togglePowerType',
      payload: {
        powerType: value,
      },
    });
    this.powerHandler();
  }
  powerHandler = () => {
    clearInterval(this.interval);
    this.props.dispatch({
      type: 'app/powerHandler',
    });
    this.setState({
      activeOperation: null,
    });
  }
  render() {
    const { powerVisible, powerType } = this.props;
    const { delayTimer, activeOperation } = this.state;
    return (
      <div className={`${styles.powerModal + (powerVisible === true ? 'active': '')}`}>
        <div className={styles.powerModalMask}>
          <Row type="flex" justify="space-around" align="middle" style={{ height: '100%', width: '60%', margin: '0 auto' }}>
            <Col span={4}>
              <CircleProgress onClick={this.operationPower.bind(null, 2)} active={activeOperation === 2} delay={powerType === 2} delaytime={delayTimer} name={'重启'} />
            </Col>
            <Col span={4}>
              <CircleProgress onClick={this.operationPower.bind(null, 1)} active={activeOperation === 1} delay={powerType === 1} delaytime={delayTimer} name={'关机'} />
            </Col>
            <Col span={4}>
              <CircleProgress onClick={this.hideModalHandler} active={activeOperation === 0} name={'取消'} />
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

