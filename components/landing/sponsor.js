import Image from "next/image";
import Link from "next/link";

const list = [
  {
    name: "Taskade",
    path: "taskade-logo.png",
    link: "https://www.taskade.com/",
  },
  {
    name: "Echo3D",
    path: "echo3d-logo.png",
    link: "https://www.echo3d.com/",
  },
  {
    name: "Hudson River Trading",
    path: "hrt-logo.svg",
    link: "https://www.hudsonrivertrading.com/",
  },
  {
    name: "Small Planet",
    path: "sp-logo.svg",
    link: "https://smallplanet.com/",
  },
  {
    name: "XYZ Domains",
    path: "xyz-logo.png",
    link: "https://www.taskade.com/",
  },
];

const Sponsors = () => {
  return (
    <div id="sponsors" className="flex flex-col items-center justify-center py-24 border-b-8 border-green-500 ">
      <div className="flex items-center justify-center mb-20">
        <span className="py-6 border-b-4 border-yellow-500 md:text-5xl text-7xl font-morro">SPONSORS</span>
      </div>
      <h1 className="mb-20 text-xl md:text-center md:px-4 md:mb-12 md:text-base font-montserrat">
        Thanks to our amazing sponsors for making AtomHacks possible!
      </h1>
      <div className="flex flex-wrap items-center justify-center">
        {list.map((sponsor, i) => (
          <div className="mx-24 my-8" key={i}>
            <Link href={sponsor.link} passHref>
              <Image width={250} height={250} key={i} src={`/assets/sponsors/${sponsor.path}`} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
