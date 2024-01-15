import './App.css';
import { YoutubeForm } from './components/YoutubeForm';
import { YupYouTubeForm } from './components/YupYoutubeForm';
import { ZodYouTubeForm } from './components/ZodYoutubeForm';

function App() {
  return (
    <div>
      <YoutubeForm />
      <YupYouTubeForm />
      <ZodYouTubeForm />
    </div>
  );
}

export default App;
