import { Button, Container, Nav, Navbar as NavbarBs } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FiShoppingCart} from 'react-icons/fi';
import { useShoppingCart } from '../../context/ShoppingCartContext';

export function Navbar() {
  const { openCart, cartQuantity } = useShoppingCart();

  return (
    <NavbarBs sticky='top' className='bg-white shadow-sm mb-3'>
      <Container>
        <Nav>
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>

          <Nav.Link to="/store" as={NavLink}>
            Store
          </Nav.Link>

          <Nav.Link to="/about" as={NavLink}>
            About
          </Nav.Link>
        </Nav>

        {cartQuantity > 0 && (
          <Button
            onClick={openCart}
            className='rounded-circle'
            variant='outline-primary'
            style={{
              position: 'relative',
              width: '50px',
              height: '50px',
            }}
          >
            <FiShoppingCart style={{ fontSize: '25px' }} />

            <div
              className='rounded-circle bg-danger d-flex 
                        justify-content-center align-items-center'
              style={{
                color: "white",
                width: "20px",
                height: "20px",
                position: "absolute",
                bottom: 0,
                right: 0,
                transform: 'translate(25%, 25%)'
              }}
            >
            {cartQuantity}

            </div>
          </Button>
        )}
        
      </Container>
    </NavbarBs>
  )
}
