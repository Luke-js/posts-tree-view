import React from "react";
import { Accordion, Icon } from "semantic-ui-react";
import Post from "./Post";
import DataHelper from "../helpers/DataHelper";

export default class PostGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, data) {
    const toggle = !this.state.active;
    this.setState({ active: toggle });
  }

  render() {
    let displayText = new DataHelper().generateDisplayText(this.props.groupBy);
    const { active } = this.state;

    return (
      <div>
        <Accordion.Title active={active} onClick={this.handleClick}>
          <Icon name="dropdown" />
          {displayText} {this.props.name}
        </Accordion.Title>
        <Accordion.Content active={active}>
          <Accordion>
            {this.props.posts.map((post) => {
              return <Post key={post.id} post={post} />;
            })}
          </Accordion>
        </Accordion.Content>
      </div>
    );
  }
}
