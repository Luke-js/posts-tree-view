import React from "react";
import moment from "moment";
import {
  Accordion,
  Icon,
  Segment,
  Container,
  Divider,
} from "semantic-ui-react";
import PostForm from "./PostForm";

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.post.id,
      location: props.post.location,
      time: moment.unix(props.post.time).format("DD MMM YYYY [at] HH:mm"),
      author: props.post.author,
      text: props.post.text,
      active: false,
    };

    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleItemClick() {
    const toggle = !this.state.active;
    this.setState({ active: toggle });
  }

  handleInputChange(attr, value) {
    this.setState({
      [attr]: value,
    });
  }

  render() {
    const { active } = this.state;

    return (
      <Segment attached key={this.state.id}>
        <Accordion.Title active={active} onClick={this.handleItemClick}>
          <Icon name="dropdown" />
          <Icon name="user" color="grey" />
          <span className="author">{this.state.author}</span>
          <div className="description">
            {"from " + this.state.location + " on " + this.state.time}
          </div>
        </Accordion.Title>
        <Accordion.Content active={active}>
          <Container>
            {this.state.text}
            <Divider horizontal>Edit</Divider>
            <PostForm
              author={this.state.author}
              location={this.state.location}
              onInputChange={this.handleInputChange}
            />
          </Container>
        </Accordion.Content>
      </Segment>
    );
  }
}
