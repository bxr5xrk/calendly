import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { colors } from '@entities/Label/config/colors';

interface SelectColorDropdownProps {
  selected: string;
  setSelected: (i: string) => void;
}

export default function SelectColorDropdown({
  selected,
  setSelected
}: SelectColorDropdownProps) {
  const items = colors.filter((i) => i !== selected);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="absolute right-8">
        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white p-2 text-left focus:outline-none">
          <span
            className="block w-5 h-5 rounded-full"
            style={{ backgroundColor: selected }}
          ></span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {items.map((color) => (
              <Listbox.Option
                key={color}
                className={({ active }) =>
                  `relative cursor-pointer select-none p-2 ${
                    active ? 'bg-gray-100' : 'text-gray-900'
                  }`
                }
                value={color}
              >
                <span
                  className="block w-5 h-5 rounded-full"
                  style={{ backgroundColor: color }}
                ></span>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
