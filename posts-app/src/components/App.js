import React from "react";
import {
  Container,
  Accordion,
  Dimmer,
  Loader,
  Message,
} from "semantic-ui-react";
import PostGroup from "./PostGroup";
import GroupBySelector from "./GroupBySelector";
import validateJSON from "../helpers/JSONHelper";
import DataHelper from "../helpers/DataHelper";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      groupBy: "time",
      data: null,
    };

    this.handleGroupByChange = this.handleGroupByChange.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:3010/v1/post")
      .then((response) => response.json())
      .then(
        (result) => {
          validateJSON(result).valid
            ? this.setState({
                isLoaded: true,
                data: result,
              })
            : this.setState({ error: "JSON validation failed." });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: error.message,
          });
        }
      );
  }

  handleGroupByChange(value) {
    this.setState({
      groupBy: value,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <Dimmer active page>
          <Message negative>
            <Message.Header>An error occurred</Message.Header>
            {this.state.error}
          </Message>
        </Dimmer>
      );
    } else if (!this.state.isLoaded) {
      return (
        <Dimmer active page inverted>
          <Loader />
        </Dimmer>
      );
    } else {
      const groups = new DataHelper().groupPostBy(
        this.state.data,
        this.state.groupBy
      );
      let postGroups = [];
      for (const [key, value] of groups) {
        postGroups.push(
          <PostGroup
            key={key}
            name={key}
            groupBy={this.state.groupBy}
            posts={value}
          />
        );
      }

      return (
        <Container text>
          <GroupBySelector
            value={this.state.groupBy}
            onGroupByChange={this.handleGroupByChange}
          />
          <Accordion styled fluid>
            {postGroups}
          </Accordion>
        </Container>
      );
    }
  }
}
