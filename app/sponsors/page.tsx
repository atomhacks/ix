import Image from "next/image";

const list = [
  {
    name: "Bronx Science Alumni Foundation",
    path: "alumni-foundation.png",
    link: "https://alumni.bxscience.edu/",
  },
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
  {
    name: "Wolfram Alpha",
    path: "wolfram-logo.svg",
    link: "https://www.wolframalpha.com/",
  },
];

const Sponsors = () => {
  return (
    <div
      className="flex flex-col items-center justify-center border-b-8 border-green-500 bg-zinc-900 py-24 text-white"
    >
      <div className="mb-20 flex items-center justify-center">
        <span className="border-b-4 border-yellow-500 py-6 font-morro text-7xl md:text-5xl">SPONSORS</span>
      </div>
      <h1 className="mb-20 font-montserrat text-xl md:mb-12 md:px-4 md:text-center md:text-base">
        Thanks to our amazing sponsors for making AtomHacks possible!
      </h1>
      <div className="flex flex-wrap items-center justify-center">
        {list.map((sponsor, i) => (
          <div className={`mx-24 my-8 flex justify-center ${i == 0 && "basis-full"}`} key={i}>
            <a href={sponsor.link}>
              <Image
                width={i == 0 ? 600 : 250}
                height={250}
                key={i}
                src={`/assets/sponsors/${sponsor.path}`}
                alt={`${sponsor.name} Logo`}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
