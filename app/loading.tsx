import Spinner from "./components/Spinner";

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-neutral-800 font-montserrat text-white">
      <Spinner className="-ml-1 mr-3 h-8 w-8 animate-spin text-white" />
    </div>
  );
}
