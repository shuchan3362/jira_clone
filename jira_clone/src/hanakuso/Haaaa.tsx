type Props = {
  hanakuso?: {
    haha: string;
  };
};

export const Hanakuso = (props: Props) => {
  const { hanakuso } = props;
  const a = hanakuso?.haha;
  return (
    <div>
      <p>{a}</p>
    </div>
  );
};
