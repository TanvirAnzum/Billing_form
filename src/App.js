import { useState } from "react";
import Form from "./components/Form";

function App() {
  // for copy button triggering
  const [isCopyTriggered, setIsCopyTriggered] = useState(false);
  return (
    <div className="App">
      <Form
        title={"Billing Address"}
        source={true}
        isCopyTriggered={isCopyTriggered}
        setIsCopyTriggered={setIsCopyTriggered}
      />
      <Form
        title={"Shipping Address"}
        source={false}
        isCopyTriggered={isCopyTriggered}
        setIsCopyTriggered={setIsCopyTriggered}
      />
    </div>
  );
}

export default App;
