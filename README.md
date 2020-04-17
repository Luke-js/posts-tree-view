# Overview

This submission contains a web app and Node.js API server that renders a tree view of posts.

The web app is built on React framework with Semantic UI as styling library.

Jest and Enzyme are used for testing.

## Usage

Node.js is required to run this project.

Open a terminal and go to root directory of this project. Run startup script to start API server and React App (make sure the script has execute permission).

```bash
sh startup.sh
```

Go to http://localhost:3000/ to view the app. Go to http://localhost:3010/v1/post to access API server.

## Testing
A unit test class is created for each React component class and helper class.

## Validation

The web app validates JSON file returned by API server. It checks if response from server is a valid JSON file, as well as if the JSON file matches defined schema. The schema validation checks if required fields present, and if value of each property matches defined type (integer, string, enum, UTC timestamp, etc.). If an error occurred fetching JSON data, or JSON data is invalid against schema, an error message will be displayed.

User inputs are also validated. Author field allows input up to 30 characters, while location field only accepts a predefined list of values.
