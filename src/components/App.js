import '../styles/App.module.css';
import Header from './Header';
import ListView from './ListView.js';
import PresentRegist from './PresentRegist';

function App() {
  return (
    <div>
      <Header />
      <PresentRegist />
      <ListView />
    </div>
  );
}

export default App;
