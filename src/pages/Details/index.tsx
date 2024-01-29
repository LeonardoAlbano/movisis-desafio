import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ShoppingCartProvider } from "../../context/ShoppingCartContext";

import { Home } from '../Home'
import { About } from '../About'
import { Store } from '../Store'

import { Navbar } from '../../components/Navbar'

export function Details() {
    return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/store" element={<Store />} />
           <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>

    
    )
}

