import { useLoaderData } from "react-router";
import { productLoader } from "../../app/router";
import FadeCarousel from "../carousel/FadeCarousel";

export default function Home() {
  const { products } = useLoaderData<typeof productLoader>();

  return <FadeCarousel products={products} />;
}
