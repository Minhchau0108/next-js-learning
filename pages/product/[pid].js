import fs from "fs/promises";
import path from "path";
function ProductDetailPage(props) {
  const { product } = props;
  if (!product) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
}
async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  return JSON.parse(jsonData);
}
export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  const data = await getData();

  const selectedProduct = data.products.find((p) => p.id === productId);
  if (!selectedProduct) {
    return {
      notFound: true,
    };
  }
  return {
    props: { product: selectedProduct },
  };
}
export async function getStaticPaths() {
  const data = await getData();
  const params = data.products.map((product) => ({
    params: { pid: product.id },
  }));

  return {
    paths: params,
    fallback: true,
  };
}
export default ProductDetailPage;
