import { useState } from "react";
import storeItems from "../../data/items.json";
import { Col, Row, FormControl } from "react-bootstrap";
import { StoreItem } from "../../components/StoreItem";


export function Store() {
  const [searchTerm, setSearchTerm] = useState(""); 

  // Função para filtrar os itens com base no termo de pesquisa
  const filteredItems = storeItems.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.price.toString().includes(searchTerm) ||
      item.data.toString().includes(searchTerm)
    );
  });

  return (
    <>
      <h1> Movisis Performance Parts</h1>

      {/* Barra de pesquisa */}
      <FormControl
        type="text"
        placeholder="Pesquisar por nome, preço ou data"
        className="mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Row md={2} xs={1} lg={3} className="g-3">
        {filteredItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
