import { useContext, createContext, ReactNode, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorange } from "../hooks/useLocalStorange";

// Define o tipo para os props do provedor do carrinho de compras
type ShoppingCartProviderProps = {
    children: ReactNode;
};

// Define o tipo para um item no carrinho de compras
type CartItem = {
    id: number;
    name: string;
    quantity: number;
};

// Define o tipo para o contexto do carrinho de compras
type ShoppingCartContext = {
    openCart: () => void;
    closeCart: () => void;
    getItemQuantity: (id: number) => number;
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    cartQuantity: number;
    clearCart: () => void;
    cartItems: CartItem[];
};

// Cria o contexto do carrinho de compras
const ShoppingCartContext = createContext({} as ShoppingCartContext);

// Hook personalizado para consumir o contexto do carrinho de compras
export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

// Componente provedor para o carrinho de compras
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    // Estado para controlar se o carrinho de compras está aberto ou fechado
    const [isOpen, setIsOpen] = useState(false);
    // Utiliza o hook personalizado useLocalStorange para obter e atualizar os itens do carrinho no localStorage
    const [cartItems, setCartItems] = useLocalStorange<CartItem[]>("shopping-cart", []);

    // Calcula a quantidade total de itens no carrinho
    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

    // Funções para abrir, fechar e limpar o carrinho
    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);
    const clearCart = () => setCartItems([]);

    // Função para obter a quantidade de um item específico no carrinho
    function getItemQuantity(id: number) {
        return cartItems.find((item) => item.id === id)?.quantity || 0;
    }

    // Função para aumentar a quantidade de um item no carrinho
    function increaseCartQuantity(id: number) {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id) == null) {
                return [...currItems, { id, quantity: 1, name: "" }]; 
            } else {
                return currItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
            }
        });
    }

    // Função para diminuir a quantidade de um item no carrinho
    function decreaseCartQuantity(id: number) {
        setCartItems((currItems) => {
            if (currItems.find((item) => item.id === id)?.quantity === 1) {
                return currItems.filter((item) => item.id !== id);
            } else {
                return currItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item));
            }
        });
    }

    // Função para remover um item do carrinho
    function removeFromCart(id: number) {
        setCartItems((currItems) => currItems.filter((item) => item.id !== id));
    }

    // Fornece o contexto e suas funções para os componentes filhos
    return (
        <ShoppingCartContext.Provider
            value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                cartItems,
                cartQuantity,
                openCart,
                closeCart,
                clearCart,
            }}
        >
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    );
}
