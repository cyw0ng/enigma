import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default class TopBar extends React.Component {
    render() {
        return (
          <div className="cont-topbar-root">
            <AppBar position='fixed'>
              <Toolbar>
                <Typography variant="h6">
                  Enigma
                </Typography>
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>
          </div>
        );
    }
}