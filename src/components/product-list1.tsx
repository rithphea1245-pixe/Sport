"use client";

import { Price, PriceValue } from "@/components/price";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProductPrice {
  regular: number;
  sale?: number;
  currency: string;
}

// custom type through api
interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
  badge?: {
    text: string;
    color?: string;
  };
}

type ProductCardProps = Product;

type ProductList = Array<Product>;

interface ProductListProps {
  className?: string;
}

const ProductList = ({ className }: ProductListProps) => {
  // create useState and useEffect to fetch data from api
  const [products, setProducts] = useState<Product[]>([]);

  // create useEffect
  useEffect(() => {
    async function fetchProductApi() {
      const response = await fetch("https://fakestoreapi.com/products");
      const productData = await response.json(); // convert from json to js object

      setProducts(productData);
    }

    fetchProductApi(); // call function
  }, []);

  // const PRODUCTS_LIST = data from api
  const PRODUCTS_LIST = products;

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid place-items-center gap-6 md:grid-cols-2 xl:grid-cols-3">
          {PRODUCTS_LIST.map((item, index) => (
            <ProductCard key={`product-list-card-${index}`} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({
  title,
  description,
  image,
  badge,
  price,
}: ProductCardProps) => {
  return (
    <a
      href="#"
      className="block h-full w-full max-w-md transition-opacity hover:opacity-80"
    >
      <Card className="h-full overflow-hidden p-0">
        <CardHeader className="relative p-0">
          <AspectRatio ratio={1.268115942} className="overflow-hidden">
            <Image
              src={image}
              alt={title}
              width={500}
              height={500}
              className="block size-full object-cover object-center"
            />
          </AspectRatio>

          {badge && (
            <Badge
              style={{
                backgroundColor: badge.color,
              }}
              className="absolute start-4 top-4"
            >
              {badge.text}
            </Badge>
          )}
        </CardHeader>

        <CardContent className="flex h-full flex-col gap-4 pb-6">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>

          <CardDescription className="font-medium text-muted-foreground">
            {description}
          </CardDescription>

          <div className="mt-auto">
            <Price className="text-lg font-semibold">
              <PriceValue price={price} variant="sale" />
              <PriceValue variant="regular" />
            </Price>
          </div>
        </CardContent>
      </Card>
    </a>
  );
};

export { ProductList };
