export default function DetailsDropdown(props: { content: JSX.Element[] }) {
  return (
    <details open={true} className={"w-full flex flex-col flex-wrap cursor-pointer"}>
      <summary className="font-bold">{"Table DDL"} </summary>
      <div className="pl-4">{props.content}</div>
    </details>
  );
}
