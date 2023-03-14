import Spinner from "../components/Spinner";

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-neutral-800 font-montserrat text-white">
      <Spinner />
    </div>
  );
}
