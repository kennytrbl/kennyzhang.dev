import Press from "./press";

function PressPanel() {
  return (
    <div className="mt-4 sm:mt-6 xl:float-left w-full xl:w-[60%]">
      <p id="press" className="font-bold leading-none mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl tracking-tight">
        Press
      </p>
      <Press
        items={[
          { type: "youtube", url: "https://www.youtube.com/embed/2NWVuugbcYs" },
          { type: "youtube", url: "https://www.youtube.com/embed/llF84Qv6pIQ" },
          { type: "youtube", url: "https://www.youtube.com/embed/svMwJHic-X0" },
          { type: "youtube", url: "https://www.youtube.com/embed/77zeZc1OvxE" },
          {
            type: "article",
            title: "USA TODAY",
            description: "10 best night markets in the United States",
            url: "https://10best.usatoday.com/awards/best-night-market/",
          },
          {
            type: "article",
            title: "Compassion in Oakland",
            description: "AAPI Nomination",
            url: "https://www.instagram.com/p/CdO5-kjhh-W/",
          },
        ]}
      />
    </div>
  );
}

export default PressPanel;
