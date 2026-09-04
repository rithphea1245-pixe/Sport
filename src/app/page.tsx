// import Image from "next/image";
import { ProductList1 } from "@/components/product-list1";
import AnimatedListDemo from "@/components/shadcn-space/animated-list/animated-list-01";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <section>
      <AnimatedListDemo></AnimatedListDemo>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
      {/* Product */}
      <ProductList1></ProductList1>
    </section>
  );
}
