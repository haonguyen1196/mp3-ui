import { useState } from "react";

function App() {
  const [work, setWork] = useState("")
  console.log(work);
  return (
    <div className="h-screen flex justify-center items-center gap-8">
      <input type="text" 
        className="outline-none border border-blue-600 px-4 py-2 w-[400px] rounded-md"
        value={work}
        onChange={e => setWork(e.target.value)}
      />
      <button type="button" className="px-4 py-2 text-white bg-blue-500 rounded-md">Add</button>
    </div>
  );
}

export default App;
