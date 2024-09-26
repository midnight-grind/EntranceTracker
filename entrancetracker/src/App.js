import logo from './logo.svg';
import './App.css';

function App() {
  const items = [1, 2, 3];
  return (
    <div className="App">
      <header className="App-header">
        <div>
          {items.map((item) => (
            <ShowLocations key={item} />
          ))}
          <ShowSpaces/>
        </div>
      </header>
    </div>
  );
}

function ShowLocations() {
  return <span className="box">test</span>;
}

function ShowSpaces() {
  return <span className="space"></span>
}

export default App;