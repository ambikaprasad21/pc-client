import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// eslint-disable-next-line react/prop-types
const LazyImage = ({ src, alt }) => {
  return (
    <LazyLoadImage
      alt={alt}
      effect="blur"
      src={src}
      width="100%"
      height="auto"
    />
  );
};

export default LazyImage;
