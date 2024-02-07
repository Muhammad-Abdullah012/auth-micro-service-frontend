import React, { LabelHTMLAttributes } from "react";

export const Label = ({
  children,
  ...rest
}: LabelHTMLAttributes<HTMLLabelElement>) => {
  return <label {...rest}>{children}</label>;
};
