import ReactLoading from "react-loading";

export default function Loading({
  children,
  isLoading,
  className,
}: {
  children: any;
  isLoading: boolean;
  className?: string;
}) {
  if (isLoading) {
    return (
      <div>
        <ReactLoading type="spin" color="#0000FF" height={100} width={50} />
      </div>
    );
  } else {
    return <div className={className}>{children}</div>;
  }
}
