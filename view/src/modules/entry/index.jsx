import React from "react";
import Layout from "../../containers/layout/Layout";
import Config from "./config";
import FrontPage from "../frontPage/index";
import AttackAnalyzer from "../attackAnalyzer";

export default class Entry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      runtimeConfig: Config,
    };
  }

  selectMenuIndexHandler = (id) => {
    let newConfig = Object.assign({}, this.state.runtimeConfig);
    let menuUpdateIndex = newConfig.menu.findIndex((item) => item.id === id);
    newConfig.menu.forEach((item, index) => {
      if (index === menuUpdateIndex) {
        item.selected = true;
      } else {
        item.selected = false;
      }
    });
    this.setState({ runtimeConfig: newConfig });
  };

  render() {
    const runtimeConfig = this.state.runtimeConfig;
    let component = <FrontPage />;
    if (window.enigmaDebug.isDebug) {
      // TBD: Remove later, for 0.1.0 Development
      component = <AttackAnalyzer />;
    }
    if (runtimeConfig != null) {
      const componentIdx = runtimeConfig.menu.findIndex(
        (item) => item.selected
      );
      if (componentIdx !== -1) {
        component = runtimeConfig.menu[componentIdx].component;
      }
    }

    return (
      <div>
        <Layout
          menuConfig={this.state.runtimeConfig}
          selectMenuIndex={this.selectMenuIndexHandler}
          component={component}
        />
      </div>
    );
  }
}
