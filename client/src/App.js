import './App.css';
import PostForm from './pages/createPost'
import PostList from './pages/Posts'

export const url = process.env.REACT_APP_URL;

function App() {
  return (
    <div className="App">
      <PostForm></PostForm>
      <PostList></PostList>
    </div>
  );
}

export default App;
