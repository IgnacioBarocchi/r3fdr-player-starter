import { useGameStore } from "../../../hooks/useGameStore/useGameStore";

const AbilityBar = () => {
  const { ability } = useGameStore((state) => ({
    ability: state.characterState.ability,
  }));

  const boxStyle = {
    width: '50px',
    height: '50px',
    backgroundColor: 'red',
    margin: '8px',
    display: 'inline-block',
  };

  const container = {
    display: "flex",
    position: "absolute",
    justifyContent: "space-between",
    bottom: "10",
    left: "50%",
    zIndex: '2'
  };

  return (
    // @ts-expect-error ts is not recognizing the style prop
    <div style={container}>
      <div style={boxStyle}>{ability === "Punching" ? ability : null}</div>
      <div style={boxStyle}>{ability === "Kicking" ? ability : null}</div>
      <div style={boxStyle}>{ability === "Punching" ? ability : null}</div>
      <div style={boxStyle}>{ability === "Kicking" ? ability : null}</div>
    </div>
  );
};

export default AbilityBar;
