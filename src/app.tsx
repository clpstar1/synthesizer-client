import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PlayButton from './ui/play-button';

function UserInterface() {
    return (
        <div>
          <PlayButton />
        </div>
    )
}

function render() {
  ReactDOM.render(<UserInterface />, document.body);
}

render();