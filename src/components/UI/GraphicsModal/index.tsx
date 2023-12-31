import { useAppConfig } from "../../../containers/context/AppContext";

const GraphicsModal = () => {
  const {
    state: { GRAPHICS },
    dispatch,
  } = useAppConfig();

  const handleGraphicsChange = (event: { target: { value: any } }) => {
    const graphics = event.target.value;
    dispatch({ type: "UPDATE_GRAPHICS", payload: graphics });
  };
  return (
    <div>
      <label>
        Graphics:
        <select value={GRAPHICS} onChange={handleGraphicsChange}>
          <option value="LOW">Low</option>
          <option value="NORMAL">Normal</option>
          <option value="HIGH">High</option>
        </select>
      </label>
    </div>
  );
};

export default GraphicsModal;
