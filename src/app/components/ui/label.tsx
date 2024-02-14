import React, { LabelHTMLAttributes } from "react";

export const Label = ({
  children,
  className = "",
  ...rest
}: LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label className={"text-gray-900 dark:text-gray-100" + className} {...rest}>
      {children}
    </label>
  );
};
