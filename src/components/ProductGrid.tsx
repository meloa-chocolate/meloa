import { products } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function ProductGrid() {
  return (
    <section id="chocolate" className="section shell">
      <div className="max-w-2xl">
        <p className="eyebrow">THE COLLECTION</p>
        <h2 className="section-title mt-4">Выберите свой вкус</h2>
        <p className="mt-4 text-base leading-7 text-cocoa/65">Небольшие партии шоколада, созданные вручную.</p>
      </div>
      <div className="mt-10 grid gap-x-6 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}
