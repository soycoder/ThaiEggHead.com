import { ButtonGroup } from 'react-bootstrap';
import '../App.css';
import { images, COLORS, FONTS, SIZES } from '../constants';

function App() {
  const buttonn = <button>create a custom Filter</button>

  return (
    <div className="App">
      <header className="app-header">
        <h4>Thai Egghead</h4>
      </header>
      <div className="app-content"></div>
      <div className="app-grid">
        <div className="app-main">
          Complie error: Multiple definitions in int main
          <p><img src={images.bi} width="500" height="300"/></p>
          <p><img src={images.bi} width="500" height="300"/></p>
        </div>
        <div className="app-menu">
          Custom Filter
          <p>{buttonn}</p>
        </div>
        <div className="app-blank"></div>
      </div>
    </div>
  );
}

export default App;
