import Sponsor from "./components/Sponsor";

const sponsors = [
  {
    name: "Bronx Science Alumni Foundation",
    path: "alumni.svg",
    link: "https://alumni.bxscience.edu/",
    featured: true,
  },
  {
    name: "Taskade",
    path: "taskade.svg",
    link: "https://www.taskade.com/",
    featured: false,
  },
  {
    name: "Echo3D",
    path: "echo3d.svg",
    link: "https://www.echo3d.com/",
    featured: false,
  },
  {
    name: "Hudson River Trading",
    path: "hrt.svg",
    link: "https://www.hudsonrivertrading.com/",
    featured: false,
  },
  {
    name: "Small Planet",
    path: "sp.svg",
    link: "https://smallplanet.com/",
    featured: false,
  },
  {
    name: "XYZ Domains",
    path: "xyz.svg",
    link: "https://www.taskade.com/",
    featured: false,
  },
  {
    name: "Wolfram Alpha",
    path: "wolfram.svg",
    link: "https://www.wolframalpha.com/",
    featured: false,
  },
];

const Sponsors = () => {
  return (
    <div className="flex flex-col items-center justify-center border-b-8 border-green-500 bg-zinc-900 py-24 text-white">
      <div className="mb-20 flex items-center justify-center">
        <span className="border-b-4 border-green-500 py-6 font-morro text-7xl">SPONSORS</span>
      </div>
      <h1 className="mb-20 font-montserrat text-xl text-center">
        Thanks to our amazing sponsors for making AtomHacks possible!
      </h1>
      <div className="grid w-5/6 grow grid-cols-3 items-center justify-center gap-4 md:grid-cols-1">
        {sponsors.map((sponsor, i) => (
          <Sponsor sponsor={sponsor} key={i}></Sponsor>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
