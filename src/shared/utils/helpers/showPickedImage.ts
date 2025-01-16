import { ChangeEvent } from 'react';

type Props = {
  e: ChangeEvent<HTMLInputElement>;
  func: (img: string) => void;
};

export const showPickedImage = ({ e, func }: Props) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const imagesSrc = e.target?.result;
    func(imagesSrc as string);
  };
  reader.readAsDataURL(file);
};
