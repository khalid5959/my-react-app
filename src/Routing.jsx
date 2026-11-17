import { Check } from "lucide-react";
import { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink, useParams, Outlet } from "react-router-dom";
import Home from "./pages/Home";


export const UserName = createContext();


function RouterApp() {
  const [name, setName] = useState("");

  const [ItemCart, setItemCart] = useState(() => {
    const savedCart = localStorage.getItem("mySavedCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("mySavedCart", JSON.stringify(ItemCart))
  }, [ItemCart]);

  const Cars = [
    {
      id:1,
      name: "Chevrolet",
      model: " Chevrolet Camaro V8",
      year: 2025,
      engine: "V8, 4 Liter, 6 Valve, Oil cooled",
      price: 32000,
      baseprice: 32000,
      img: "/img/camaro.jpg",
      imgPortrait: "/img/camaroportrait.jpg",
    },
    {
      id:2,
      name: "Ford",
      model: "Ford Spider F38",
      year: 2020,
      engine: "Parallel-twin, 4 Liter, 6 Valve, Oil cooled",
      price: 40000,
      baseprice: 40000,
      img: "/img/spider.jpg",
      imgPortrait: "/img/spiderportrait.jpg",
    },
    {
      id:3,
      name: "Cadillac",
      model: "Cadillac Lincoln Sedan",
      year: 2024,
      engine: "Parallel-twin, 4 Liter, 6 Valve, Oil cooled",
      price: 50000,
      baseprice: 50000,
      img: "/img/cadillac.jpg",
      imgPortrait: "/img/cadillacportrait.jpg",
    },
    {
      id:4,
      name: "Honda",
      model: "Honda Civic G5 Twin",
      year: 2025,
      engine: "Inline-6, 2.2 Liter, 4 Valve, Liquid cooled",
      price: 20000,
      baseprice: 20000,
      img: "/img/honda.jpg",
      imgPortrait: "/img/hondaportrait.jpg",
    },
    {
      id:5,
      name: "Fiat",
      model: "Fiat Grande 600",
      year: 2023,
      engine: "Inline-4, 1.8 Liter, 2 Valve, Air cooled",
      price: 35000,
      baseprice: 35000,
      img: "/img/fiat.jpg",
      imgPortrait: "/img/fiatportrait.jpg",
    },
    {
      id:6,
      name: "Toyota",
      model: "Toyota Axel SUV",
      year: 2022,
      engine: "Parallel-twin, 4 Liter, 6 Valve, Oil cooled",
      price: 25000,
      baseprice: 25000,
      img: "/img/toyota.jpg",
      imgPortrait: "/img/toyotaportrait.jpg",
    },
  ]

  function filteredCar(Cars){
    const sumofCars = Cars.filter((car) => car.price >= 35000)
                          .reduce((acc, car) => acc + car.price, 0);
    return sumofCars;
  }
  console.log(filteredCar(Cars));

  let cartSum = ItemCart.reduce((acc, car) => acc + car.quantity, 0);
  return (
    <BrowserRouter>
      <UserName.Provider value={{ name, setName, Cars, ItemCart, setItemCart }}>
        <div className="routing_container h-fit p-5">
          <div className="flex justify-between items-center w-full px-1">
            <div className="justify-self-start">
              <NavLink to="/Products" className="text-white sticky top-5 inline-block bg-linear-to-r from-[#c53222] to-orange-400 p-3 px-4 rounded-2xl transition duration-200 hover:text-black/50 active:scale-95"
              >Back</NavLink>
            </div>
            <nav className="bg-linear-to-r from-[#c53222] to-orange-400 cursor-default transition duration-300 hover:-translate-y-1 hover:scale-100 min-[700px]:w-fit min-w-55 mx-auto p-3 rounded-2xl">
              <NavLink to="/" className={({ isActive }) =>
                isActive ? "text-black/50 font-bold" : "text-white inline-block transition duration-300 hover:text-black/50"}
              >Home</NavLink> |{` `}
              <NavLink to="/Products" className={({ isActive }) =>
                isActive ? "text-black/50 font-bold" : "text-white inline-block transition duration-300 hover:text-black/50"}
              >Product</NavLink> | {` `}
              <NavLink to="/Contact" className={({ isActive }) =>
                isActive ? "text-black/50 font-bold" : "text-white inline-block transition duration-300 hover:text-black/50"}
              >Contact</NavLink>
            </nav>
            <div className="justify-self-end">
              <NavLink to="/Cart" className="text-white inline-block bg-linear-to-r from-[#c53222] to-orange-400 p-3 rounded-2xl transition duration-200 hover:text-black/50 active:scale-95"
              >Cart: {cartSum}</NavLink>
            </div>
          </div>


          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/Products/:CarName" element={<CarPage/>} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Cart" element={<Cart/>} />
          </Routes>
        </div>
      </UserName.Provider>
    </BrowserRouter>
  )
}


function Contact() {
  const { name } = useContext(UserName);
  return (
    <div className="bg-white/15 backdrop-blur-3xl text-wrap border border-white/20 rounded-2xl py-3 px-5 min-w-100 w-[70%] flex flex-col items-start shadow-xl m-auto mt-10">
      <p>Email: NYCcardealership@gmail.com</p>
      <p>Number: 765-293-266</p>
      <p className="text-left ">Address: Brooklyn 21 street, Manhattan, NYC, USA</p>
      <p className="text-left ">Message us, dear {name || "user"}:</p>
      <textarea type="text" placeholder="write your email here" className="bg-black/40 backdrop-blur-1xl border border-white/20 rounded-2xl w-[80%] h-30 mt-1 px-2 py-2 resize-none" />
    </div>
  )
}


function Products() {
  const {Cars} = useContext(UserName);
  return (
    <div className="routing-carcontainer mt-10 grid grid-cols-2 md:grid-cols-3 justify-items-center">
      {Cars.map((car) => (
        <div key={car.name} className="carboxes w-50 h-50 mb-10 transition duration-300 hover:scale-105 border-4 border-black/22 rounded-[20px] overflow-hidden">
          <Link to={`/Products/${car.name}`}>
            <img src={car.img} alt="" />
            <h2 className="pt-5">{car.name}</h2>
          </Link>
        </div>
      ))}
    </div>
  )
}

function CarPage() {
  const {Cars, ItemCart, setItemCart} = useContext(UserName);
  const { CarName: activeID } = useParams();

  const post = Cars.find((item) => item.name === activeID)

  function AddCart(){
    const existingItem = ItemCart.find((cartItem) => cartItem.name === post.name)
    setItemCart(
      existingItem ?
      ItemCart.map((cartItem) =>  
        cartItem.id === post.id ?
          {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            price: post.price * (cartItem.quantity + 1)
          }
          : cartItem
      )
      : [...ItemCart, {id: post.id, name: post.name, img: post.img, price: post.price, baseprice: post.price, quantity: 1}]
    );
    alert(`${post.name} added to cart!`);
  }

  return (
    <div className="bg-black/25 backdrop-blur-3xl h-80 mx-5 mt-5  flex rounded-3xl overflow-hidden">
      <img src={post.imgPortrait} alt="post pic" className="w-[35%] object-cover" />
      <div className="flex flex-col items-start justify-evenly mx-4 my-2 mb-5">
        <p className="text-4xl text-left">{post.model}</p>
        <div className="flex flex-col text-left items-start justify-evenly mt-2 mb-5 h-35">
          <p>Manufacturing Year: {post.year}</p>
          <p>Engine: {post.engine}</p>
          <p>Insurance: Included</p>
          <p className="text-2xl">Price: ${post.price.toLocaleString()}</p>
        </div>

        <div>
          <SpotlightButton onClick={AddCart}>
            Book Pre-Order
          </SpotlightButton>
        </div>
      </div>
    </div>
  )
}


function Cart() {
  const {ItemCart, setItemCart} = useContext(UserName);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(null);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);

  function clearCart(){
    if(ItemCart.length > 0){
      setModalMessage("Are you sure you want to clear your cart?");
      setModalType("clear");
      setIsModalOpen(true);
    }
    else{
      alert(`your cart is empty`);
    }
  }

  function plusBtn(id){
    setItemCart(ItemCart.map((cartItem) => 
      cartItem.id === id ?
        {...cartItem, 
          quantity: cartItem.quantity + 1,
          price: cartItem.baseprice * (cartItem.quantity + 1)}
        : cartItem
    ));
  }

  function minusBtn(id){
    setItemCart(ItemCart.map((cartItem) => 
      cartItem.id === id ?
        {...cartItem, 
          quantity: cartItem.quantity - 1,
          price: cartItem.baseprice * (cartItem.quantity - 1)}
        : cartItem
    )
    .filter((cartItem) => cartItem.quantity > 0)
    );
  }


  const handleConfirmYes = () => {
    if(modalType === "clear"){
      setItemCart([]);
      localStorage.removeItem("mySavedCart");
    }
    else if (modalType === "delete" && itemToDeleteId !== null) {
      minusBtn(itemToDeleteId); 
    }
    setIsModalOpen(false);
    setItemToDeleteId(null);
    setModalType(null);
  };

  const handleConfirmNo = () => {
    setIsModalOpen(false); 
    setModalType(null)
    setItemToDeleteId(null);
    setModalMessage("");
  };

  

  let totalPrice = ItemCart.reduce((acc, item) => acc + item.price, 0).toLocaleString();
  
  
  return (
    <div className="flex flex-col bg-white/10 backdrop-blur-2xl text-wrap 
          border border-white/20 rounded-3xl font-bold sm:font-normal p-3 mt-8 mx-auto min-h-80 w-[90%] min-w-110 
          max-w-200">
      <div className="grid grid-cols-3 items-center border-b pb-3 mb-2">
        <div></div>
        <p className="font-bold">Your Cart Items</p>
        <button onClick={clearCart} className="justify-self-end mr-4 py-1 px-2 font-bold rounded-2xl bg-red-600 cursor-pointer transition duration-300 hover:scale-105 active:scale-200"
        >clear cart</button>
      </div>
      
      <div className="cart_lists flex flex-col gap-2">
        <div className="cart_title grid grid-cols-[1fr_5fr_3fr_2fr] items-center border-b-2 border-white/90 pb-1 h-fit">
          <div className="h-full flex items-center justify-center">
            no.
          </div>
          <div className=" ">
            item
          </div>
          <div className="h-full flex items-center justify-center">
            quantity
          </div>
          <div className="">
            price
          </div>
        </div>

        {ItemCart.length === 0 ? (
          <p className="text-white text-center py-4">Your cart is empty.</p>
        ) : (
          <>
          {ItemCart.map((item, index) => (
            <div key={item.id} className="grid grid-cols-[1fr_5fr_3fr_2fr] items-center border-b-2 border-white/40 pb-1 min-h-10 h-fit">
              <div className="h-full flex items-center justify-center border-r-2">
                {index + 1}
              </div>
              <div className="grid grid-cols-[1fr_4fr_1fr]  items-center">
                <img src={item.img} className="w-15 rounded-2xl" alt="" /><span>{item.name}</span>
              </div>
              <div className="h-full flex items-center justify-center gap-3">
                {/* minus */}
                <button onClick={() => {
                  item.quantity === 1 ?
                  (setItemToDeleteId(item.id), 
                  setModalType("delete"), 
                  setIsModalOpen(true), 
                  setModalMessage("Are you sure you want to delete item from cart?"))
                  : minusBtn(item.id)
                  }}
                  className="minus cursor-pointer transition duration-300 hover:scale-105 active:scale-95 hover:bg-white/90 hover:text-black px-2.5 bg-black/50 rounded-2xl">-</button>
                {item.quantity}
                {/* plus */}
                <button onClick={() => plusBtn(item.id)} className="plus cursor-pointer transition duration-300 hover:scale-105 active:scale-95 hover:bg-white/90 hover:text-black px-2.5 bg-black/50 rounded-2xl">+</button>
              </div>
              <div className="">
                ${item.price.toLocaleString()}
              </div>
            </div>
          ))}
          <div className="grid grid-cols-[9fr_2fr] items-center divide-x-2  border-white/40 pb-1  h-fit">
            <h2 className="justify-self-end pr-7">total</h2>
            ${totalPrice}
          </div>
          </>
        )}

        <ConfirmModal
          isOpen={isModalOpen}
          message={modalMessage}
          onConfirm={handleConfirmYes}
          onCancel={handleConfirmNo}
        />
       
      </div>
    </div>
  )
}

function ConfirmModal({ isOpen, message, onConfirm, onCancel }) {
  // If the modal isn't open, don't render anything on the screen
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="bg-slate-900 flex flex-col gap-4 border border-white/20 px-6 py-7 rounded-2xl shadow-2xl w-90 text-center text-white">
        <p className="text-lg font-bold mb-5">
          {message}
        </p>
        
        <div className="flex justify-center gap-4">
          <button 
            onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-xl font-bold cursor-pointer transition"
          >
            No
          </button>
          
          <button 
            onClick={onConfirm}
            className="bg-sky-600 hover:bg-blue-400 px-4 py-2 rounded-xl font-bold cursor-pointer transition"
          >
            Yes
          </button> 
        </div>
      </div>
    </div>
  );
}

function SpotlightButton({ children, onClick, className = "" }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden bg-white/10 backdrop-blur-md py-2 px-5 rounded-3xl font-bold cursor-pointer transition duration-200 hover:scale-105 active:scale-95 border border-white/20 ${className}`}
    >
      {/* The Mouse-Following Spotlight Layer */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(100px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.4), transparent 70%)`,
        }}
      />

      {/* Content wrapper so text stays above the spotlight */}
      <span className="relative z-10 text-white">{children}</span>
    </button>
  );
}

function TextGlowButton({ children, onClick, className = "" }) {
  // 1. State and mouse logic live neatly inside the component
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const [btnOpacity, setBtnOpacity] = useState(0);

  const handleBtnMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setBtnPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <button
      onClick={onClick}
      onMouseMove={handleBtnMouseMove}
      onMouseEnter={() => setBtnOpacity(1)}
      onMouseLeave={() => setBtnOpacity(0)}
      className={`relative overflow-hidden bg-white/10 backdrop-blur-md py-2 px-6 rounded-3xl font-bold cursor-pointer transition duration-200 hover:scale-105 active:scale-95 border border-white/25 ${className}`}
    >
      {/* Base Text (Dimmed state) */}
      <span className="block text-white/60 transition-colors duration-300">
        {children}
      </span>

      {/* Orange Glowing Overlay Text using the prop */}
      <span
        className="absolute inset-0 flex items-center justify-center text-transparent pointer-events-none transition-opacity duration-300"
        style={{
          opacity: btnOpacity,
          backgroundImage: `radial-gradient(90px circle at ${btnPos.x}px ${btnPos.y}px, #ff5c04 0%, transparent 70%)`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
        }}
      >
        {children}
      </span>
    </button>
  );
}

export default RouterApp;