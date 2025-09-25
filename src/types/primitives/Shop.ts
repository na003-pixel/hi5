export interface Shop {
	Id: string;
	Name: string;
	Slug: string;
}



export interface ShopV2 {
	Id: string;
	Name: string;
	Slug?: string;
	Website?: string;
	ReviewLink?: string;
	Email?: string;
	Phone?: number;
	Industry?: string;
	Type?: string;
	OwnerName?: string;
}


export interface ShopRecordInDB {
	id: string;
	shop_id: string;
	website_url: string;
	qr_code_url?: string;
	google_review_link: string;
	shops: {
		id: string;
		name: string;
		industry?: string;
		type?: string;
		email?: string;
		phone?: number;
		owner_name?: string;
	}
}