import React from "react";
import Layout from "../../containers/layout/Layout";
import Config from "./config";
import FrontPage from "../frontPage/index";

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
    if (runtimeConfig != null) {
      const componentIdx = runtimeConfig.menu.findIndex(
        (item) => item.selected
      );
      if (componentIdx !== -1) {
        component = runtimeConfig.menu[componentIdx].component;
      }
    }

    console.log("---", component);
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
