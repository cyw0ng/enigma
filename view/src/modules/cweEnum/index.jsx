import React from "react";
import http from "../../utils/rest/http";
import { FixedSizeList } from "react-window";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default class CWEEnum extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cweList: [],
      selectedIndex: -1,
    };
  }

  componentDidMount() {
    http.get("/rest/v1/cve-query/cwe/all").then(({ data }) => {
      if (data.code === 0) {
        this.setState({ cweList: data.payload });
      } else {
      }
    });
  }

  handleSelectCWERow = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  renderCWERows = (props) => {
    const { index, style } = props;
    const cweRecord = this.state.cweList[index];

    return (
      <ListItem
        button
        style={style}
        key={index}
        onClick={(event) => this.handleSelectCWERow(event, index)}
      >
        <ListItemText primary={"CWE-" + cweRecord.id + ": " + cweRecord.name} />
      </ListItem>
    );
  };

  render() {
    let cweRecord = null;
    if (this.state.selectedIndex >= 0) {
      cweRecord = this.state.cweList[this.state.selectedIndex];
    }
    console.log(cweRecord);

    return (
      <div>
        CWEEnum
        <FixedSizeList
          height={400}
          width={300}
          itemSize={46}
          itemCount={this.state.cweList.length}
        >
          {this.renderCWERows}
        </FixedSizeList>
        {this.state.selectedIndex >= 0 ? (
          <div>
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {"CWE-" + cweRecord.id}
                </Typography>
                <Typography variant="h5" component="h2">
                  {cweRecord.name}
                </Typography>
                <Typography color="textSecondary">
                  {cweRecord.status + " / "}
                  <b>{cweRecord.weaknessabs}</b>
                </Typography>
                <Typography variant="body2" component="p">
                  {cweRecord.Description}
                  <br />
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </div>
        ) : null}
      </div>
    );
  }
}
