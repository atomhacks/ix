import Image from "next/image";

const Sponsor = ({ sponsor }: { sponsor: { name: string; path: string; link: string; featured: boolean } }) => {
  return (
    <div
      className={`relative block h-48 items-center justify-center rounded-lg bg-gradient-to-r from-green-500 to-yellow-500 p-1  ${
        sponsor.featured ? "col-span-full" : "col-span-1"
      }`}
    >
      <div className="back flex h-full w-full items-center justify-center rounded-md bg-white">
        {" "}
        <a href={sponsor.link}>
          <Image
            className="object-contain p-8"
            src={`/assets/sponsors/${sponsor.path}`}
            alt={`${sponsor.name} Logo`}
            fill={true}
          />
        </a>
      </div>
    </div>
  );
};

export default Sponsor;
