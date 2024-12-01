export const revalidate = 60;

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { type Gender } from "@prisma/client";
import { redirect } from "next/navigation";


interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  }
}

export default async function CategoryByIdPage({ params, searchParams }: Props) {
  const { gender } = params;

  const page = searchParams?.page ? parseInt(searchParams?.page) : 1

  const { products, totalPages } = await getPaginatedProductsWithImages({ gender: gender as Gender, page });

  if(products.length === 0) {
    redirect(`$/gender/${gender}`)
  }

  const labels: Record<string, string> = {
    'men': 'para hombres',
    'women': 'para mujeres',
    'kid': 'para niños' ,
    'unisex': 'para todos',
  } 

  // if(id === 'kids') {
  //   notFound()
  // }

  return (
    <>
      <Title
        title={`Artículos de ${labels[gender]}`}
        subTitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}