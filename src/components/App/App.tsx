import * as React from 'react';
import WorkspaceDashboard from "./WorkspaceDashboard/WorkspaceDashboard";


class App extends React.Component<any,any> {

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Che Native Client</h1>
          <WorkspaceDashboard />
        </header>
      </div>
    );
  }
}

export default App;
