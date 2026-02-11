import type { LabeledInputType } from "../../types/type";

export const LabeledInput = ({
  label,
  placeholder,
  type,
  onchange,
}: LabeledInputType) => {
  return (
    <>
      <div>
        <label className="mb-2 text-sm font-medium text-gray-900">
          {label}
        </label>
        <input
          type={type || "text"}
          placeholder={placeholder}
          required
          onChange={onchange}
          className="w-full h-10 border rounded px-2 border-gray-300 bg-gray-50 text-gray-800 text-sm"
        />
      </div>
    </>
  );
};
