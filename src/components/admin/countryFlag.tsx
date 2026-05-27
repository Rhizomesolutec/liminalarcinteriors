"use client";

import React from "react";
import * as Flags from "country-flag-icons/react/3x2";

type FlagProps = {
  countryCode: string;
};

const Flag = ({ countryCode }: FlagProps) => {
  const FlagComponent = Flags[countryCode.toUpperCase() as keyof typeof Flags];
  return <FlagComponent className="size-6 " />;
};
export default function CountryFlag({ code }: { code?: string }) {
  return <Flag countryCode={code || ""} />;
}
