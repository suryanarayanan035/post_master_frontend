export default function Heading(props) {
  const { children } = props;
  return <h4 className="uppercase font-bold text-lg">{children}</h4>;
}
