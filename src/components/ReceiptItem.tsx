const ReceiptItem = ({ description, subTotal, quantity }: { description: string, subTotal: number, quantity: number }) => {
    const multiple = quantity > 1;
    const total = (quantity * subTotal).toFixed(2);
    return (
        <li className="receipt__item">
            <span className="receipt__item-description">
                {description}:
            </span>
            <span className="receipt__item-price">
                {multiple ?
                    `${total} (${quantity} @ ${subTotal.toFixed(2)})` :
                    `${subTotal.toFixed(2)}`}
            </span>
        </li>
    )
}

export default ReceiptItem;