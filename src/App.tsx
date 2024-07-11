import "./App.css";
import PivotTable from "./components/PivotTable/PivotTable";
import { useLoadData } from "./hooks/useLoadData";
import { useTransformData } from "./hooks/useTransformData";

function App() {
  const { response, loading } = useLoadData();
  const { headers, data } = useTransformData({ response });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <PivotTable headers={headers} data={data} />
    </div>
  );
}

export default App;
