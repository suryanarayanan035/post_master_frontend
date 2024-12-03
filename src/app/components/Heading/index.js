export default function Heading(props) {
  const { children } = props;
  return <h4 className="text-lg font-bold uppercase">{children}</h4>;
}
