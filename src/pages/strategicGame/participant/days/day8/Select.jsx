import React from "react";
import Select from "react-select";
import style from "./style.module.scss";

const Option = (props) => {
  const { children, innerRef, innerProps } = props;

  return (
    <div className={style.select_option} {...innerProps} ref={innerRef}>
      {children}
    </div>
  );
};

export default ({ value, data, onChange }) => (
  <Select
    components={{ Option }}
    onChange={(item) => {
      onChange(item.value);
    }}
    value={value}
    styles={{
      control: (base, state) => {
        return {
          ...base,
          boxShadow: "none",
          borderColor: "hsl(0, 0%, 80%) !important",
        };
      },
    }}
    options={data}
  />
);
