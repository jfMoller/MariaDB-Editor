export default function Button(props: {
  text: string, color: string, handleClick: () => void;
}) {
  return (
    <button
      onClick={props.handleClick}
      className={
        " text-white font-bold py-2 px-4 rounded mr-2 " + `bg-${props.color}-500 ` + `hover:bg-${props.color}-700`
      }
    >
      {props.text}
    </button>
  );
}
