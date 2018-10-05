import * as React from 'react';
import WorkspaceDashboard from "./WorkspaceDashboard/WorkspaceDashboard";


class App extends React.Component<any,any> {

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <WorkspaceDashboard />
        </header>
      </div>
    );
  }
}

export default App;
