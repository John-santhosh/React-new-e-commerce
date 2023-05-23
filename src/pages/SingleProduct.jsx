import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const params = useParams();
  return <div>SingleProduct: {params.id}</div>;
};

export default SingleProduct;
