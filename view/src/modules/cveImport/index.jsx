import React from 'react'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import './index.css';

export default class CVEImport extends React.Component {
    render() {
        return <div className="module-cveimport-root">
            <Paper square>
                paper
                <TextField label="CVSS ID" variant="outlined"/>
            </Paper>
        </div>
    }
}