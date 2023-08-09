import { ChangeEvent, useState } from "react";
import { useSubmit } from "react-router-dom";
import Button from "../components/Button";
import ConfirmDialogue from "../components/ConfirmDialogue";
import ConfirmQueryText from "./components/ConfirmQueryText";
import DetailsDropdown from "../components/DetailsDropdown";
import TextArea from "../components/form/TextArea";

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

  const formattedTableDDL = props.tableDDL
    .split("\n")
    .map((newLine, index) => <p key={index}>{newLine}</p>);

  return (
    <>
      <ConfirmDialogue
        visible={confirmQuery}
        color="indigo"
        caption="Confirm query"
        description={
          <ConfirmQueryText
            query={query}
            text="Are you sure you want to execute this query?"
          />
        }
        confirmButton="Confirm"
        onConfirm={() => handleQuery()}
        onCancel={() => setConfirmQuery(false)}
      />

      <div className="p-4 text-white rounded-md border mb-6 bg-gray-800 border-gray-700">
        <DetailsDropdown content={formattedTableDDL} />
        <TextArea
          header={"SQL Query"}
          name={"query"}
          defaultValue={query}
          handleChange={handleInputChange}
        />

        <div className="mt-4 flex justify-between sm:justify-end">
          <Button
            text={"Execute"}
            color={"indigo"}
            className={"sm:mr-0"}
            handleClick={() => setConfirmQuery(true)}
          />
        </div>
      </div>
    </>
  );
}
