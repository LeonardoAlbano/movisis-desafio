import { Button, Card, Modal } from "react-bootstrap";
import { useState } from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utils/formatCurrency";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  description: string;
  data: string;
};

export function StoreItem({
  id,
  name,
  price,
  imgUrl,
  description,
  data
}: StoreItemProps) {
  // Obtém funções e estado do contexto do carrinho de compras
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  // Obtém a quantidade do item no carrinho
  const quantity = getItemQuantity(id);
  const [showModal, setShowModal] = useState(false);

  // Funções para lidar com a abertura e fechamento do modal
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

// Função para formatar a data
function formatDate(inputDate: string | Date, displayFullDate: boolean = false): string {
  if (typeof inputDate === 'string') {
    const dateParts = inputDate.split('/');
  
    if (dateParts.length === 3) {
      const [day, month, year] = dateParts;
  
      // Validar se day, month e year são números
      if (!isNaN(parseInt(day)) && !isNaN(parseInt(month)) && !isNaN(parseInt(year))) {
        const formattedDate = new Date(`${year}-${month}-${day}`);
  
        // Validar se a data resultante é válida
        if (!isNaN(formattedDate.getTime())) {
          return displayFullDate ? formattedDate.toDateString() : `${day}/${month}/${year}`;
        }
      }
    }
  
    // Se a string de data não estiver no formato esperado ou a data resultante não for válida, retorne a string original
    return inputDate;
  } else {
    // Se a entrada for um objeto Date, retorne sua representação como string
    return displayFullDate ? inputDate.toDateString() : inputDate.toLocaleDateString('pt-BR');
  }
}

  return (
    <>
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={imgUrl}
          height="200px"
          style={{ objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title 
            className="d-flex justify-content-between 
                        align-items-baseline mb-4"
          >
            <span className="fs-2">{name}</span>
            <span className="ms-2 text-muted">{formatCurrency(price)}</span>
          </Card.Title>

          <div className="mt-auto">
            
            {
              quantity === 0 ? (
                <Button 
                  className="w-100" 
                  onClick={() => increaseCartQuantity(id)}
                >
                  + Adicionar ao Carrinho
                </Button>

              ) : (

                <div
                  className="d-flex align-items-center flex-column"
                  style={{ gap: ".5rem" }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ gap: ".5rem" }}
                  >
        
                    <Button
                      style={{ borderRadius: "50%" }}
                      onClick={() => decreaseCartQuantity(id)}
                    >
                      -
                    </Button>

                    <div>
                      <span className="fs-3">{quantity}</span> no carrinho
                    </div>

                    <Button
                      style={{ borderRadius: "50%" }}
                      onClick={() => increaseCartQuantity(id)}
                    >
                      +
                    </Button>
                  </div>

                  <Button
                    onClick={() => removeFromCart(id)}
                    variant="danger"
                    size="sm"
                  >
                    Remover
                  </Button>
                </div>
              )}
          </div>
          
          <Button 
            variant="link" 
            onClick={handleModalShow} 
            className="mt-2"
            style={{ textDecoration:"none", color:"salmon" }}
          >
            Ver Mais
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <div className="d-flex">
            <img
              src={imgUrl}
              alt={name}
              style={{ width: "50%", marginRight: "15px", objectFit: "cover" }}
            />

            <div>
              <h4>Descrição</h4>
              <p>{description}</p>
              <p>{formatCurrency(price)}</p>

              <div 
                className="mt-4 text-muted" 
                style={{ fontSize: "small", marginBottom:"24px" }}
              >
                Data da Publicação: {formatDate(data)}
              </div>

              {
                quantity === 0 ? (
                  <Button 
                    className="w-100" 
                    onClick={() => increaseCartQuantity(id)}
                    style={{ marginTop: '30px'}}
                  >
                    + Adicionar ao Carrinho
                  </Button>
               ) : (
                  <div
                    className="d-flex align-items-center flex-column"
                    style={{ gap: ".5rem" }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{ gap: ".5rem" }}
                    >

                      <Button
                        style={{ borderRadius: "50%" }}
                        onClick={() => decreaseCartQuantity(id)}
                      >
                        -
                      </Button>

                      <div>
                        <span className="fs-3">{quantity}</span> no carrinho
                      </div>

                      <Button
                        style={{ borderRadius: "50%" }}
                        onClick={() => increaseCartQuantity(id)}
                      >
                        +
                      </Button>
                    </div>

                    <Button
                      onClick={() => removeFromCart(id)}
                      variant="danger"
                      size="sm"
                    >
                      Remover
                    </Button>
                  </div>
                )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
