## Run Project

1. install npm install -g yarn

## UI

1. PartialComponent in React refers to breaking down UI into smaller, reusable, and independent components that represent parts of the application.

```
export const partial = (Component, partialProps) => {
  return (props) => {
    return <Component {...partialProps} {...props} />;
  };
 export const Button = ({ size, color, text, ...props }) => {
  return (
    <button
      style={{
        fontSize: size === 'large' ? '25px' : '16px',
        backgroundColor: color,
      }}
    >
      {text}
    </button>
  );
};
export const SmallButton = partial(Button, { size: 'small' });
export const LargeRedButton = partial(Button, {
  size: 'large',
  color: 'crimson',
});
};
```

2. React composition is a powerful design pattern that allows you to build flexible, reusable, and maintainable components by combining smaller components.

```
export const Button = ({ size, color, text, ...props }) => {
  return (
    <button
      style={{
        fontSize: size === "large" ? "25px" : "16px",
        backgroundColor: color,
      }}
    >
      {text}
    </button>
  );
};
export const SmallButton = (props) => {
  return <Button {...props} size={"small"} />;
};
export const SmallRedButton = (props) => {
  return <SmallButton {...props} color={"crimson"} />;
};
```

3. Avoid re-render components by passing them as children

```
<DynamicScroll>
    <SlowComponent />
    <AdditionalComplexThings />
</DynamicScroll>

const DynamicScroll = ({ children }: { children: ReactNode }) => {
  const [position, setPosition] = useState(170);
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const newPosition = calculatePosition(e.currentTarget.scrollTop);
    setPosition(Math.max(113, newPosition));
  };
  const blockColor = calculateColor(position);

  return (
    <ScrollableContainer onScroll={handleScroll}>
      <DynamicBlock top={position === 113 ? 113 : position} color={blockColor}>
        🛒
      </DynamicBlock>
      {children}
    </ScrollableContainer>
  );
};
```

4. Override default props to change the css value depend on parent component

```
<Button size="lg" icon={<Loading/>} />
<Button type="primary" icon={<Loading />} />

const Button = ({
  type,
  icon,
  size,
}: {
  type?: string;
  icon: ReactElement;
  size?: string;
}) => {
  const defaultProps = {
    size: size === "lg" ? "lg" : "md",  // path lg size for icon to <Loading />
    color: type === "primary" ? "white" : "black", // path white color props for icon to <Loading />
  };

  const newProps = {
    ...defaultProps,
    ...icon.props,
  };

  const clonedIcon = React.cloneElement(icon, defaultProps);

  return <button>Submit {clonedIcon}</button>;
};
```
