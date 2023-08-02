export default function AnimatedSubmitButton(props: {
  isLoading: boolean;
  handleConnect: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  return (<>
    <button
      type="submit"
      className={`w-full flex justify-center py-3 px-6 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
        props.isLoading ? "cursor-not-allowed opacity-70" : ""
      }`}
      disabled={props.isLoading}
      onClick={props.handleConnect}
    >
      {props.isLoading ? (
        <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-white rounded-full"></div>
      ) : (
        "Connect"
      )}
    </button>
  </>);
}
