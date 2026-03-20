type ProductCardProps = {
    product :{
        title: string;
        description: string;
        price: number;
        imageUrl?: string;
    }
};

export const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <div className="product-card">
            {product.imageUrl && <img src={product.imageUrl} alt={product.title} />}
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
        </div>
    )
}