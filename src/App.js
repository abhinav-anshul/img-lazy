import "./styles.css";
import Image from "./Image";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Image
        src="https://source.unsplash.com/random/100x100"
        fallback={<h1>Loading...</h1>}
      />
    </div>
  );
}
