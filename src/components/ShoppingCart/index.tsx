import { Offcanvas, Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { CartItem } from "../CartItem";
import storeItems from "../../data/items.json";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems, clearCart } = useShoppingCart();
  
  // Função para lidar com o checkout (finalização da compra)
  const handleCheckout = () => {

    // Exibir um alerta com as informações do carrinho
    const cartInfo = cartItems.map((item) => {
      const storeItem = storeItems.find((i) => i.id === item.id);
      const itemTotal = (storeItem?.price || 0) * item.quantity;
      return `${item.quantity} x ${storeItem?.name}: ${formatCurrency(storeItem?.price || 0)} (Total: ${formatCurrency(itemTotal)})`;
    });

    const totalAmount = cartItems.reduce((total, cartItem) => {
      const storeItem = storeItems.find((i) => i.id === cartItem.id);
      return total + (storeItem?.price || 0) * cartItem.quantity;
    }, 0);

    // Exibir um alerta com as informações do pedido
    window.alert(`Pedido enviado!\n\nProdutos:\n${cartInfo.join("\n")}\n\nTotal: ${formatCurrency(totalAmount)}`);

    clearCart();
    closeCart();
  };

  return (
    
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <Stack gap={3}>
          
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}

          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const storeItem = storeItems.find((i) => i.id === cartItem.id);
                return total + (storeItem?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>

          <Button
             variant="success" 
             className="mt-3" 
             onClick={handleCheckout}
          >
            Finalizar Compra
          </Button>
        
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
