import { useState } from "react";
import { addBook } from "../api's/book-api";
import Sidebar from "../component/Sidebar";

export default function AddBook() {
    const [newBook, setNewBook] = useState({
        isbn: "",
        tittle: "",  
        author: "",
        totalQuantity: "",   
        issuedQuantity: "",
        price: "",

    });
    const handleChange = (e) => {
        setNewBook({
            ...newBook,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        await addBook(newBook);
        alert("Book added successfully");
         setNewBook({
            isbn: "",
            tittle: "",  
            author: "",
            totalQuantity: "",   
            issuedQuantity: "",
            price: "",
        });
    }

    return (
        <>
           <section className="app-section">
            <h1>Add New Book</h1>
            
            <form className="ui form" onSubmit={handleSubmit}>
                <label>ISBN</label>
                <div className="field">
                    <input type="text" name="isbn" placeholder="ISBN"
                        required={true}
                        value={newBook.isbn}
                        onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Tiitle</label>
                    <input type="text" name="tittle" placeholder="tittle"
                        required={true}
                        value={newBook.tittle}
                        onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Author</label>
                    <input type="text" name="author" placeholder="Author"
                        required={true}
                        value={newBook.author}
                        onChange={handleChange} />
                </div>
                 <div className="field">
                    <label>Total Quantity</label>
                    <input 
                        type="number" 
                        name="totalQuantity" 
                        placeholder="Total Quantity"
                        required
                        value={newBook.totalQuantity}
                        onChange={handleChange} 
                        min={1}
                    />
                </div>
                <div className="field">
                    <label>Issued Quantity</label>
                    <input 
                        type="number" 
                        name="issuedQuantity" 
                        placeholder="Issued Quantity"
                        required
                        value={newBook.issuedQuantity}
                        onChange={handleChange} 
                        min={0}
                    />
                </div>
                  <div className="field">
                    <label>Price</label>
                    <input type="number" name="price" placeholder="Price"
                        required={true}
                        value={newBook.price}
                        onChange={handleChange} 
                        min={1}
                        />
                </div> 
                <button className="ui button" type="submit">Submit</button>
            </form>
        </section>
        <Sidebar/>
        </>
    )
};
