"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Accordion = ({
  i,
  expanded,
  setExpanded,
  data,
}: {
  i: number;
  expanded: number | false;
  setExpanded: React.Dispatch<React.SetStateAction<number | false>>;
  data: { head: string; items: string[] };
}) => {
  const isOpen = i === expanded;

  return (
    <>
      <motion.div
        className=" w-ful border-b border-[#7F6456] h-10  mt-3 flex justify-between"
        initial={false}
        // animate={{ backgroundColor: isOpen ? "#FF0088" : "#0055FF" }}
        onClick={() => setExpanded(isOpen ? false : i)}
      >
        <p>{data.head}</p>

        {/* <ArrowLeft /> */}
        <div className=" size-4 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 512.02 319.26"
          >
            <path d="M5.9 48.96 48.97 5.89c7.86-7.86 20.73-7.84 28.56 0l178.48 178.48L434.5 5.89c7.86-7.86 20.74-7.82 28.56 0l43.07 43.07c7.83 7.84 7.83 20.72 0 28.56l-192.41 192.4-.36.37-43.07 43.07c-7.83 7.82-20.7 7.86-28.56 0l-43.07-43.07-.36-.37L5.9 77.52c-7.87-7.86-7.87-20.7 0-28.56z" />
          </svg>
        </div>
      </motion.div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {data.items.map((item, i) => (
              <li className="flex items-center" key={i}>
                <svg
                  className="w-3.5 h-3.5 me-2 text-[#7F6456]  shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                {item}
              </li>
            ))}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};
const accordionIds = [
  {
    head: "Municipal Authorities",
    items: [
      "Dubai Municipality (DM)",
      "Abu Dhabi Municipality (ADM)",
      "Sharjah Municipality",
      "Other Emirates' Municipalities",
    ],
  },
  {
    head: "Civil Defense Authorities",
    items: [
      "Dubai Civil Defense (DCD)",
      "Abu Dhabi Civil Defense (ADCD)",
      "Sharjah Civil Defense",
    ],
  },
  {
    head: "Free Zones & Special Authorities",
    items: [
      "Trakhees (PCFC)",
      "Dubai Development Authority (DDA)",
      "Dubai Multi Commodities Centre (DMCC)",
      "Dubai International Financial Centre (DIFC)",
      "TECOM Group",
      "Jebel Ali Free Zone Authority (JAFZA)",
      "Nakheel, Emaar, or other private developers",
    ],
  },
  {
    head: "Electricity & Water Authorities",
    items: [
      "Dubai Electricity and Water Authority (DEWA)",
      "Abu Dhabi Distribution Company (ADDC)",
      "Sharjah Electricity and Water Authority (SEWA)",
      "Federal Electricity and Water Authority (FEWA)",
    ],
  },
  {
    head: "Environmental & Sustainability Authorities",
    items: [
      "Dubai Municipality Green Building Regulations",
      "Estidama (Abu Dhabi)",
    ],
  },
  {
    head: "Health & Safety Authorities",
    items: [
      "Dubai Health Authority (DHA)",
      "Ministry of Health & Prevention (MOHAP)",
      "Abu Dhabi Department of Health (DOH)",
    ],
  },
  {
    head: "Food & Beverage Sector Approvals",
    items: ["Dubai Municipality Food Control Department"],
  },
  {
    head: "Roads & Transport Authorities",
    items: [
      "Roads and Transport Authority (RTA) – Dubai",
      "Integrated Transport Centre (ITC) – Abu Dhabi",
      "Sharjah Roads & Transport Authority (SRA)",
    ],
  },
  {
    head: "Building Management & Developer Approvals",
    items: [
      "Building Owner/Landlord NOC",
      "Mall Management Approval (For retail spaces)",
    ],
  },
];

export default accordionIds;

export const Example = () => {
  const [expanded, setExpanded] = useState<false | number>(-1);
  return (
    <>
      <div className="flex justify-center w-full  pb-10 px-2.5">
        <h1 className=" hover-underline-animation text-center nasalization  text-4xl text-[#7F6456]">
          Authorities & Approvals We Work With
        </h1>
      </div>
      <div className="w-full sm:px-20 px-2.5">
        {accordionIds.map((data, i) => (
          <Accordion
            key={i}
            data={data}
            i={i}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        ))}
      </div>
    </>
  );
};
