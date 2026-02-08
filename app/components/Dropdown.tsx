import Link from "next/link";

interface DropdownButtons {
  dropdownLabel: string;
  buttons: { buttonLabel: string; link: string }[];
}

export default function DropdownElement({ dropdownLabel, buttons }: DropdownButtons) {
  return (
    <div className="relative inline-block group">
      
      <div 
        className="border-2 border-gray-200 dark:border-white/10 px-4 h-10 text-sm rounded-xl flex items-center cursor-default bg-transparent text-foreground hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
      >
        {dropdownLabel}
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 hidden group-hover:block z-50">
        <div className="bg-white dark:bg-zinc-400 border border-gray-200 dark:border-white/10 text-foreground rounded-xl shadow-2xl overflow-hidden min-w-[180px] flex flex-col py-2">
          {buttons.map((button) => (
            <Link
              key={button.link}
              href={button.link}
              className="px-4 py-2 text-sm text-center hover:bg-sky-100 dark:hover:bg-white/10 transition-colors"
            >
              {button.buttonLabel}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}