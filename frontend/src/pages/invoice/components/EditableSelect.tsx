import React, { FC, useRef, useState } from "react";
import { Text } from "@react-pdf/renderer";
import compose from "../styles/compose";

export interface SelectOption {
  value: string;
  text: string;
}

interface Props {
  className?: string;
  options?: SelectOption[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  pdfMode?: boolean;
}

const EditableSelect: FC<Props> = ({
  className,
  options,
  placeholder,
  value,
  onChange,
  pdfMode,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSelectFocus = (e: any) => {
    const select = e.target;
    if (select instanceof HTMLSelectElement) {
      select.size = select.options.length;
    }
  };

  return (
    <>
      {pdfMode ? (
        <Text style={compose("span " + (className ? className : ""))}>
          {value}
        </Text>
      ) : (
        <>
          {/* {isEditing ? 
          ( */}
          <select
            className={"select " + (className ? className : "")}
            value={value}
            onChange={
              onChange
                ? (e) => {
                    onChange(e.target.value);
                    setIsEditing(false);
                  }
                : undefined
            }
            onBlur={() => setIsEditing(false)}
            autoFocus={true}
            // onFocus={handleSelectFocus}
          >
            {options?.map((option) => (
              <option key={option.text} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          {/* ) : (
            <input
              readOnly={true}
              type="text"
              className={"input " + (className ? className : "")}
              value={value || ""}
              placeholder={placeholder || ""}
              onFocus={() => setIsEditing(true)}
            />
          )} */}
        </>
      )}
    </>
  );
};

export default EditableSelect;
