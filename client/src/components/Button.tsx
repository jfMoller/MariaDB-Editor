export default function Button(props: {
  text: string;
  color: string;
  handleClick: () => void;
}) {
  const bgAndHover = `bg-${props.color}-600 ` + `hover:opacity-90`;

  return (
    <button
      onClick={props.handleClick}
      className={" text-white font-bold py-2 px-4 rounded mr-2 " + bgAndHover}
    >
      {props.text}
    </button>
  );
}
