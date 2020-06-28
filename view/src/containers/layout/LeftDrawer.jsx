import React from "react";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

export default class LeftDrawer extends React.Component {
  handleListItemClick = (event, index) => {
    this.props.selectMenuIndex(index);
  };

  render() {
    const menuConfig = this.props.menuConfig.menu;
    let menuJSX = null;
    if (menuConfig && menuConfig.length !== 0) {
      menuJSX = (
        <List>
          {menuConfig.map((item) => (
            <ListItem
              button
              selected={item.selected}
              key={item.id}
              onClick={(event) => this.handleListItemClick(event, item.id)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label}></ListItemText>
            </ListItem>
          ))}
        </List>
      );
    }

    return (
      <div className="cont-leftdrawer-root">
        <Drawer anchor="left" variant="permanent">
          {menuJSX}
        </Drawer>
      </div>
    );
  }
}
