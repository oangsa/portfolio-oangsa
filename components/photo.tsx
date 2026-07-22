import Image from "next/image";
import photo from "../assets/me_bg.png";

export default function Photo(): JSX.Element {
  return (
    <figure className="photo-frame">
      <Image
        src={photo}
        priority
        quality={90}
        sizes="(min-width: 960px) 38vw, 86vw"
        alt="Portrait of Suthang Sukrueangkun"
      />
    </figure>
  );
}
