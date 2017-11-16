import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Progress } from 'antd';
import styles from './PowerModal.less';


class PowerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  showModalHandler = (e) => {
    e.preventDefault();
    this.setState({
      visible: true,
    });
  }
  hideModalHandler = () => {
    this.setState({
      visible: false,
    });
  }
  render() {
    const { children } = this.props;
    // const { type } = this.props;
    return (
      <div className={styles.modal} visible={this.state.visible}>
        <span onClick={this.showModalHandler}>
          { children }
        </span>
        <div className={styles.mask}>
          <Row type="flex" justify="space-around" align="middle" style={{ height: '100%', width: '60%', margin: '0 auto' }}>
            <Col span={4}>
              <Progress type="circle" width="180px" strokeWidth="4" percent={0} format={percent => '重启'} />
            </Col>
            <Col span={4}>
              <Progress type="circle" width="180px" strokeWidth="4" percent={75} format={percent => `${(percent / 100 * 60)} 秒 关机`} />
            </Col>
            <Col span={4}>
              <a onClick={this.hideModalHandler}>
                <Progress type="circle" width="180px" strokeWidth="4" percent={0} format={() => '取消'} onClick={this.hideModalHandler} />
              </a>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(PowerModal);

