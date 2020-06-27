import React from 'react';
import TopBar from './TopBar'
import LeftDrawer from './LeftDrawer'

import './Layout.css'

export default class Layout extends React.Component {
    render() {
        return (
          <div className="cont-layout-root">
              <TopBar />
              <LeftDrawer menuConfig={this.props.menuConfig} selectMenuIndex={this.props.selectMenuIndex}/>
          </div>
        );
    }
}