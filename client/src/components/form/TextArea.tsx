import { ChangeEvent } from "react";

export default function TextArea(props: {
  header?: string;
  name: string;
  defaultValue: string;
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <>
      {props.header && <h4 className="font-bold mt-3">{props.header} </h4>}
      <textarea
        name="query"
        defaultValue={props.defaultValue}
        onChange={props.handleChange}
        className="l-4 mt-1 block w-full px-4 py-2 text-sm text-white placeholder-gray-500 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      ></textarea>
    </>
  );
}
