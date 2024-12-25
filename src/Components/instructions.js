const features = [
  {
    name: "Wrong Hits",
    description:
      "Careful now. Don't be so hasty. Your wrong answers can push you back in Leaderboard.",
    // icon: CloudArrowUpIcon,
  },
  {
    name: "Restart",
    description:
      "Initializes your game progress instantly! So kindly watch out :)",
    // icon: LockClosedIcon,
  },
  {
    name: "Saved Progress",
    description:
      "Good News! Resumption from previously saved checkpoint is possible!",
    // icon: ArrowPathIcon,
  },
  {
    name: "Just 1 hour!",
    description: "Login again after an hour, to continue your session!",
    // icon: FingerPrintIcon,
  },
];

export default function Instructions() {
  return (
    <div className="bg-indigo-950 py-24 sm:py-32 m-1">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Instructions
          </p>
          <p className="mt-6 text-lg leading-8 text-white">
            This is a kinda treasure hunt game with the answers inscribed in
            images. Clues given above each image have been provided as help.
          </p>
        </div>
        <div className="mt-24 min-[768px]:grid min-[768px]:grid-rows-2 min-[768px]:grid-cols-2 max-[768px]:flex max-[768px]:flex-wrap max-[768px]:justify-center min-[768px]:gap-x-2 min-[768px]:gap-y-12">
          {features.map((feature, featureKey) => (
            <div
              key={featureKey}
              className="max-[768px]:pb-6 flex justify-center"
            >
              <div className="grid grid-rows-2 min-[768px]:w-96">
                <div className="text-xl font-bold leading-7 text-white">
                  {feature.name}
                </div>
                <div className="text-lg leading-7 text-white">
                  {feature.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
