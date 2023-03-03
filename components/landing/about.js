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
    <div id="about" className="flex flex-col py-24 border-b-8 border-yellow-500">
      <div className="flex items-center justify-center">
        <span className="py-6 border-b-4 border-green-500 md:text-5xl text-7xl font-morro">ABOUT</span>
      </div>
      <div className="container gap-20 mx-auto font-montserrat">
        {content.map((c, i) => (
          <div className="grid grid-cols-2 px-24 my-24 md:px-0 md:my-12 md:grid-cols-1" key={i}>
            {i % 2 === 0 ? (
              <>
                <div className="relative px-4 md:px-4">
                  <div className="md:hidden md:px-4 md:-inset-0.5 absolute transition duration-200 opacity-75 -inset-1 bg-gradient-to-r from-green-500 to-yellow-500 rounded-xl blur-md group-hover:opacity-100 group-hover:duration-200" />
                  <Image className="relative shadow-2xl rounded-2xl" src={c.img} alt="" />
                </div>
                <div className="my-auto ml-24 text-right md:mt-4 md:ml-0">
                  <h1 className="px-8 py-3 text-xl border-r-8 border-green-500 md:text-base"> {c.text}</h1>
                </div>
              </>
            ) : (
              <>
                <div className="my-auto mr-24 text-left md:mb-4 md:ml-0 ">
                  <h1 className="px-8 py-3 text-xl border-l-8 border-yellow-500 md:text-base"> {c.text}</h1>
                </div>{" "}
                <div className="relative md:px-4">
                  <div className="absolute transition duration-200 opacity-75 md:hidden md:px-4 -inset-1 bg-gradient-to-r from-green-500 to-yellow-500 rounded-xl blur-md group-hover:opacity-100 group-hover:duration-200" />
                  <Image className="relative shadow-2xl rounded-2xl" src={c.img} alt="" />
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
