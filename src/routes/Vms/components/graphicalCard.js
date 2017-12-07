import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Tooltip, Icon, Spin, Upload, message } from 'antd';
import styles from './graphicalCard.less';
import images from '../../../assets/images/index';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class graphicalBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadingMsg: '',
      checked: false,
    }
    this.dbClickTimer = null;
    this.ele = null;
  }
  operationHandler = (type, e) => {
    this.setState({
      loading: true,
      loadingMsg: `${type === 'on' ? '开机' : (type === 'off' ? '关机' : '重启')}中...`
    })
  }
  checkCardHandler = (e) => {
    this.ele = e.target;
    clearTimeout(this.dbClickTimer);
    this.dbClickTimer = setTimeout(() => {
      if(this.ele.nodeName === 'BUTTON' || this.ele.nodeName === 'INPUT' || this.ele.nodeName === 'I') {
        return
      }
      this.setState({
        checked: !this.state.checked,
      })
    }, 300);
  }
  dbClickHandler = () => {
    clearTimeout(this.dbClickTimer)
  }
  render() {
    const { data, index } = this.props;
    const image = images[`vmBG${(index % 4) + 1}`];
    return (
      <div onClick={this.checkCardHandler} onDoubleClick={this.dbClickHandler} className={`${styles.graphicalCard} + ' ' + ${this.state.checked ? styles.checked : ''}`}>
        <Spin tip={this.state.loadingMsg} spinning={this.state.loading}>
          <div className={styles.graphicalContent} style={{ backgroundImage: `url("${image}")`, height: 'calc(~"100vh - 300px")'}}>
            <Icon type="check-circle" className={styles.cardCheckIcon} />
            <div className={styles.graphicalMessage}>
              <div className={styles.messageBasic}>
                <div className={styles.osImage} />
                <div className={styles.name}>
                  <p>{data.name}</p>
                  <p><i className={`${styles.status} + ' ' + ${styles[data.status]}`} />{data.status === 'on' ? '开机' : '关机'}</p>
                </div>
              </div>
              <div className={styles.messageDetail}>
                <p><span>名称 :</span><span>desktop-003</span></p>
                <p><span>操作系统 :</span><span><i className={styles.osIcon} />{data.os}</span></p>
                <p><span>状态 :</span><span><i className={`${styles.status} + ' ' + ${styles[data.status]}`} />{data.status === 'on' ? '开机' : '关机'}</span></p>
                <p><span>IP地址 :</span><span>{data.ip}</span></p>
                <p><span>CPU :</span><span>{data.cpu}</span></p>
                <p><span>内存 :</span><span>{data.memory}</span></p>
                <p><span>Mac地址 :</span><span>{data.mac}</span></p>
                <p><span>磁盘 :</span><span>{data.diskused}已用／总量{data.diskall}</span></p>
              </div>
            </div>
          </div>
          <div className={styles.graphicalOperation}>
            <Tooltip placement="top" title="开机">
              <Button type="primary" disabled={data.status === 'on' ? 'disabled' : false} ghost onClick={this.operationHandler.bind(null,'on')}><Icon type="caret-right"/></Button>
            </Tooltip>
            <Tooltip placement="top" title="关机">
              <Button type="primary" disabled={data.status === 'off' ? 'disabled' : false} ghost onClick={this.operationHandler.bind(null,'off')}><Icon type="poweroff"/></Button>
            </Tooltip>
            <Tooltip placement="top" title="重启">
              <Button type="primary" disabled={data.status === 'off' ? 'disabled' : false} ghost onClick={this.operationHandler.bind(null,'reboot')}><Icon type="reload"/></Button>
            </Tooltip>
            <Tooltip placement="top" title="选择图片">
              <Upload className={styles.operationRight}>
                <Icon type="picture"/>
              </Upload>
            </Tooltip>
          </div>
        </Spin>
      </div>
    );
  }
}
export default connect(({ vms }) => ({ vms }))(graphicalBox);
