import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { getSubmission } from "../../../../lib/server";
import EditMenu from "./components/EditMenu";
import PhotoCarousel from "./components/MediaCarousel";

import { PlayCircleIcon } from "@heroicons/react/24/solid";

import Image, { StaticImageData } from "next/image";

import HackersAd from "../../../../public/ads/hackers.png";
import VercelAd from "../../../../public/ads/vercel.png";
import RobloxAd from "../../../../public/ads/roblox.png";

export default async function SubmissionPage({ params }: { params: { id: string } }) {
  const ads: Array<{ src: StaticImageData; link: string }> = [
    { src: HackersAd, link: "https://discord.gg/H2eDKxcsy6" },
    {
      src: VercelAd,
      link: "https://vercel.com",
    },
    {
      src: RobloxAd,
      link: "https://www.roblox.com/premium/membership",
    },
  ];

  const randomAd = ads[Math.floor(Math.random() * ads.length)];

  const jwt = await getServerSession({
    callbacks: {
      session: ({ token }) => token,
    },
  });
  if (!jwt || !jwt.sub) {
    redirect("/api/auth/signin");
  }

  const submission = await getSubmission(jwt.sub, params.id);
  if (!submission) {
    notFound();
  }

  const isMine = submission.team?.users.map((user) => user.id).some((id) => id == jwt.sub) ?? false;

  const media: Array<{ src: string; type: string }> = [];

  media.push({ src: submission.videoLink as string, type: "video" });

  submission.media.forEach((image) => {
    media.push({ src: image, type: "image" });
  });

  return (
    <div className="flex flex-col h-full overflow-auto">
      <div className="my-4 h-[90px] w-full items-center justify-center">
        <div className="relative m-auto h-[90px] w-[728px] items-center justify-center">
          <a href={randomAd.link}>
            {" "}
            <Image className="" src={randomAd.src} alt="test object-contain" fill />
          </a>
        </div>
      </div>
      <div className="flex flex-col justify-center mx-auto">
        <div className="flex flex-row justify-center">
          <PhotoCarousel media={media} />
          <div className="flex justify-center">
            <div className="flex flex-col max-w-screen-md px-6 py-4 ml-4 mr-3 w-80">
              <div className="mb-auto">
                <h1 className="my-2 text-5xl font-extrabold text-white">{submission.name}</h1>
                <h1 className="text-base">By {submission.team.name}</h1>
              </div>
              <div className="mt-auto">
                <div className={`flex items-center justify-center w-full h-16 align-bottom rounded-lg ${submission.srcLink ? (`bg-green-600`) : (`bg-red-500`)}`}>
                  <a href={submission.srcLink}><PlayCircleIcon className="m-auto h-9 w-9" /></a>
                </div>
              </div>
            </div>
            {isMine && <EditMenu />}
          </div>
        </div>
        <div className="my-4 flex-col overflow-auto max-w-[1052px]">
          <h1 className="my-2 text-xl font-bold">Description</h1>
          <p className="text-base font-normal whitespace-pre-line">{submission.description}</p>
        </div>
      </div>
    </div>
  );
}
