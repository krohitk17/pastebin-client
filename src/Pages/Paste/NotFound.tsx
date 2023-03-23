export default function NotFound() {
  return (
    <div className="my-5">
      <h1>Requested Paste could not be found.</h1>
      <h2>
        Given URL may be incorrect or requested paste might have been expired.
      </h2>
    </div>
  );
}
