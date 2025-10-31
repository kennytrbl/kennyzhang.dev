import Image from "next/image";

function Socials() {
  return (
    <div className="flex flex-wrap mt-3 sm:mt-4 gap-2 sm:gap-4">
      <a
        href="https://github.com/kennytrbl"
        target="_blank"
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-[#161b22] hover:bg-[#23272e] transition-colors shadow text-[#dde6ed] text-sm sm:text-lg font-semibold"
      >
        <span>Github</span>
        <Image
          className="invert w-4 h-4 sm:w-6 sm:h-6"
          src="/github.svg"
          alt="Github logo"
          width={24}
          height={24}
          priority
        />
      </a>
      <a
        href="https://www.linkedin.com/in/kennyzhang5/"
        target="_blank"
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-[#0a66c2] hover:bg-[#004182] transition-colors shadow text-[#dde6ed] text-sm sm:text-lg font-semibold"
      >
        <span>LinkedIn</span>
        <Image
          className="w-4 h-4 sm:w-6 sm:h-6"
          src="/linkedin.svg"
          alt="LinkedIn logo"
          width={24}
          height={24}
          priority
        />
      </a>
      <a
        href="https://twitter.com/_kennyzhang"
        target="_blank"
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-[#1da1f2] hover:bg-[#0d8ddb] transition-colors shadow text-[#dde6ed] text-sm sm:text-lg font-semibold"
      >
        <span>Twitter</span>
        <Image
          className="w-4 h-4 sm:w-6 sm:h-6"
          src="/twitter.svg"
          alt="Twitter logo"
          width={24}
          height={24}
          priority
        />
      </a>
      <a
        href="https://stats.fm/kenny"
        target="_blank"
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-[#1ed760] hover:bg-[#169c46] transition-colors shadow text-[#dde6ed] text-sm sm:text-lg font-semibold"
      >
        <span>Stats.fm</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 sm:w-6 sm:h-6">
          <path
            fill="#dde6ed"
            d="M77.77 151.964H31.86C14.375 151.964.2 166.169.2 183.691V477.17c0 17.521 14.175 31.726 31.66 31.726h45.91c17.486 0 31.661-14.205 31.661-31.726V183.691c0-17.522-14.175-31.727-31.661-31.727ZM277.239.73H231.33c-17.487 0-31.662 14.205-31.662 31.727V477.17c0 17.521 14.175 31.726 31.662 31.726h45.909c17.487 0 31.661-14.205 31.661-31.726V32.457C308.9 14.935 294.726.73 277.239.73ZM476.702 291.035h-45.908c-17.488 0-31.661 14.205-31.661 31.726v154.407c0 17.523 14.173 31.728 31.661 31.728h45.908c17.488 0 31.661-14.205 31.661-31.728V322.761c0-17.521-14.173-31.726-31.661-31.726Z"
          />
        </svg>
      </a>
    </div>
  );
}

export default Socials;
