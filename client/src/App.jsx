import FundMeField from "./components/FundMeField";
import Header from "./components/Header";
import TransactionRecordList from "./components/TransactionRecordList";

function App() {



  return (
    <div id="App">
      <Header title="Fund me" src="https://www.svgrepo.com/show/353715/ethereum.svg" />
      <FundMeField/>
      <TransactionRecordList/>
    </div>
  );
}

export default App;
