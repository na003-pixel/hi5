import ImageHeader from "@/components/ImageHeader";
import ShopImageHeader from "@/components/ShopImageHeader";
import { GenericPageProps } from "@/types/props/GenericPageProps";

export default async function TestPagePage ({ children, params }: GenericPageProps) {
	return (
		// <ShopImageHeader />
		<ImageHeader />
	);
}