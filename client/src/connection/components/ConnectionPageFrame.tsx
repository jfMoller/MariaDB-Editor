export default function ConnectionPageFrame(props: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow border border-gray-700">
        {props.children}
      </div>
    </div>
  );
}
