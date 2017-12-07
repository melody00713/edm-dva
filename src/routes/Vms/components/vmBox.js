import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './graphicalList.less';
import ListComponent from './list';
import GraphicalListComponent from './graphicalList';

class VmList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const vms = this.props.vms;
    return (
      <div style={{ height: '100%' }}>
        <div style={{ display: !vms.toggleListLayout ? 'block' : 'none', height: '100%' }}>
          <GraphicalListComponent list={this.props.list} />
        </div>
        <div style={{ display: vms.toggleListLayout ? 'block' : 'none' }}>
          <ListComponent list={this.props.list} />
        </div>
      </div>
    );
  }
}
export default connect(({ vms }) => ({ vms }))(VmList);
