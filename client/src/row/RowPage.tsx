import { useRouteLoaderData } from "react-router-dom";


export default function() {

  const rowData = useRouteLoaderData("rowData") as any;
  console.log(rowData)

    return (
<div>
    "test"
</div>
    )
}