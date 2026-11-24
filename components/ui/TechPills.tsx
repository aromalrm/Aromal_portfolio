import { TECH_STACK } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Dark logo-and-name pills shared by the home TECH STACK band and About skills. */
export function TechPills({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        "m-0 flex list-none flex-wrap justify-center gap-x-[10px] gap-y-2 p-0",
        className,
      )}
    >
      {TECH_STACK.map((tech) => (
        <li key={tech.name}>
          <span
            className="inline-flex h-[22px] items-center gap-[5px] rounded-full border border-[#3c3c3a] bg-[#2c2c2a] pl-[7px] pr-[9px] text-[12px] font-medium leading-none text-[#b9b9b9]"
            title={tech.name}
          >
            {tech.icon ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={tech.icon}
                alt=""
                aria-hidden="true"
                className="h-[13px] w-[13px] shrink-0 object-contain"
              />
            ) : null}
            <span>{tech.name}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
