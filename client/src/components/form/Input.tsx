export default function Input(props: {
  name: string;
  type: string;
  isRequired: boolean;
  value: string;
  placeholder: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <input
        id={props.name}
        name={props.name}
        type={props.type}
        required={props.isRequired}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        className="mt-1 block w-full px-4 py-2 text-sm text-white placeholder-gray-500 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </>
  );
}
