import { ChangeEvent, useState } from "react";
import { useSubmit } from "react-router-dom";
import Button from "../components/Button";
import ConfirmDialogue from "../components/ConfirmDialogue";

export default function QueryConsolePage(props: { tableDDL: string }) {
  const [query, setQuery] = useState("");
  const [confirmQuery, setConfirmQuery] = useState<boolean>(false);

  const submit = useSubmit();

  function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setQuery(event.target.value);
  }

  function handleQuery() {
    let formData = new FormData();
    formData.append("action", "execute-sql-query");
    formData.append("query", query);
    submit(formData, { method: "post" });
  }

  const formattedTableDDL = props.tableDDL.split('\n').map((line, index) => (
    <p className="oveflow-auto" key={index}>{line}</p>
  ));

  return (
    <>
      <div className="p-4 text-white rounded-md border mb-6 bg-gray-800 border-gray-700">
        <ConfirmDialogue
          visible={confirmQuery}
          color="indigo"
          caption="Confirm query"
          description={
            <>
              <h4 className="font-bold text-gray-300">
                Are you sure you want to execute this query?
              </h4>
              <p className="whitespace-wrap">"{query}"</p>
            </>
          }
          confirmButton="Confirm"
          onConfirm={() => {
            handleQuery();
          }}
          onCancel={() => {
            setConfirmQuery(false);
          }}
        />

        <details open={true} className={"w-full flex flex-col flex-wrap"}>
          <summary className="font-bold">{"Table DDL"} </summary>
          <div className="pl-4">{formattedTableDDL}</div>
        </details>
        <div key={`divKey$-141`} className="mb-4">
          <h4 className="font-bold mt-3">{"SQL Query"} </h4>
          <textarea
            name="query"
            defaultValue={query}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              handleInputChange(event);
            }}
            className="l-4 mt-1 block w-full px-4 py-2 text-sm text-white placeholder-gray-500 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>

        <div className="mt-4 flex justify-between sm:justify-end">
          <Button
            text={"Execute"}
            color={"indigo"}
            className={"sm:mr-4 sm:mr-0"}
            handleClick={() => {
              setConfirmQuery(true);
            }}
          />
        </div>
      </div>
    </>
  );
}