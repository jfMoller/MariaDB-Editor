export default function ConfirmQueryText(props: {
  query: string;
  text: string;
}) {
  return (
    <>
      <h4 className="font-bold text-gray-300">{props.text}</h4>
      <p className="whitespace-wrap">"{props.query}"</p>
    </>
  );
}
