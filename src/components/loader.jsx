

export default function LoaderTab(props) {
  return (
    <ul className="grid grid-flow-col gap-6 max-w-max w-full">
      <li>
          <div
      className={`
      animate-pulse block flex-shrink-0
      ${props.color === undefined ? 'bg-gray-200' : props.color }
      ${props.type === 'circle' ? 'rounded-full' : 'rounded'}
      ${props.width === undefined ? 'w-full' : props.width}
      ${props.height === undefined ? 'h-5' : props.height}
      ${props.className}
    `}
    ></div>
      </li>
      <li>
          <div
      className={`
      animate-pulse block flex-shrink-0
      ${props.color === undefined ? 'bg-gray-200' : props.color }
      ${props.type === 'circle' ? 'rounded-full' : 'rounded'}
      ${props.width === undefined ? 'w-full' : props.width}
      ${props.height === undefined ? 'h-5' : props.height}
      ${props.className}
    `}
    ></div>
      </li>
    </ul>
  );
}