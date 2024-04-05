import randomGradient from "random-gradient";

interface IssueBannerProps {
  title: string;
}

export function IssueBanner({ title }: IssueBannerProps) {
  const bgGradient = {
    background: randomGradient(title, "horizontal"),
  };

  return (
    <div
      className={`flex h-full w-[300px] items-center justify-center p-4 max-md:aspect-square max-md:w-full`}
      style={bgGradient}
    >
      <p className="text-2xl font-bold text-white">{title}</p>
    </div>
  );
}
