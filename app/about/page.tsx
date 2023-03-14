import Image from "next/image";
import img1 from "../../public/assets/about/img1.webp";
import img2 from "../../public/assets/about/img2.webp";
import img3 from "../../public/assets/about/img3.webp";

const content = [
  {
    img: img1,
    text: "AtomHacks is committed to creating and organizing innovative and interactive coding competitions for the Bronx High School of Science. We are driven to give back to our community and provide transformative computer science opportunities for students of all levels.",
  },
  {
    img: img2,
    text: "For 12 hours straight, you'll be able to let your dreams run wild, and build anything you want with the power of your fingers. You'll attend workshops, meet new people, and create something you never knew you could create!",
  },
  {
    img: img3,
    text: "At the end of the hackathon, you'll get the chance to show off the new skills you've learned and the things you've made for a chance to win a prize!",
  },
];

const About = () => {
  return (
    <div className="flex flex-col border-b-8 border-yellow-500 bg-zinc-900 py-24 text-white">
      <div className="flex items-center justify-center">
        <span className="border-b-4 border-green-500 py-6 font-morro text-7xl md:text-5xl">ABOUT</span>
      </div>
      <div className="container mx-auto gap-20 font-montserrat">
        {content.map((c, i) => (
          <div className="my-24 grid grid-cols-2 px-24 md:my-12 md:grid-cols-1 md:px-0" key={i}>
            {i % 2 === 0 ? (
              <>
                <div className="relative px-4 md:px-4">
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-green-500 to-yellow-500 opacity-75 blur-md transition duration-200 group-hover:opacity-100 group-hover:duration-200 md:-inset-0.5 md:hidden md:px-4" />
                  <Image className="relative rounded-2xl shadow-2xl" src={c.img} alt="" />
                </div>
                <div className="my-auto ml-24 text-right md:my-4 md:ml-0">
                  <h1 className="border-r-8 border-green-500 px-8 py-3 text-xl md:text-base"> {c.text}</h1>
                </div>
              </>
            ) : (
              <>
                <div className="relative order-2 px-4 md:px-4">
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-green-500 to-yellow-500 opacity-75 blur-md transition duration-200 group-hover:opacity-100 group-hover:duration-200 md:hidden md:px-4" />
                  <Image className="relative rounded-2xl shadow-2xl" src={c.img} alt="" />
                </div>{" "}
                <div className="order-1 my-auto mr-24 text-left md:order-3 md:my-4 md:ml-0">
                  <h1 className="border-l-8 border-yellow-500 px-8 py-3 text-xl md:text-base"> {c.text}</h1>
                </div>{" "}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
