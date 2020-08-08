import React from "react";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

export default class ProjectPanel extends React.Component {
  render() {
    return (
      <div>
        <Typography variant="h4" component="h2" gutterBottom>
          Attack Analyzer
        </Typography>
        <TableContainer>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Namespace</TableCell>
                <TableCell align="center">Created Time</TableCell>
                <TableCell align="center">Modified Time</TableCell>
                <TableCell align="center">Attack Profiling</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.projectList && this.props.projectList.length > 0
                ? this.props.projectList.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row" align="center">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.namespace}</TableCell>
                      <TableCell align="center">
                        {new Date(parseInt(row.createdTime)).toLocaleString()}
                      </TableCell>
                      <TableCell align="center">
                        {new Date(
                          parseInt(row.lastModifiedTime)
                        ).toLocaleString()}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={(evt) =>
                            this.props.handleProjectIntro(evt, row.projectId)
                          }
                        >
                          Go
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
