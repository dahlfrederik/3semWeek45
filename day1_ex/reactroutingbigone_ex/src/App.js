import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useParams,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { useState } from "react";

function App({ bookFacade }) {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/products">
            <Products bookFacade={bookFacade} />
          </Route>
          <Route path="/company">
            <Company />
          </Route>
          <Route path="/add-book">
            <AddBook bookFacade={bookFacade} />
          </Route>
          <Route path="/find-book">
            <FindBook bookFacade={bookFacade} />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Header() {
  return (
    <ul className="header">
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/products">
          Products
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/add-book">
          Add Book
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/find-book">
          Find Book
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/company">
          Company
        </NavLink>
      </li>
    </ul>
  );
}

function FindBook({ bookFacade }) {
  const [bookId, setBookId] = useState("");
  const [book, setBook] = useState(null);

  const findBook = () => {
    const foundBook = bookFacade.findBook(bookId);
    setBook(foundBook);
  };

  const deleteBook = (id) => {
    bookFacade.deleteBook(id);
    setBook(null);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setBook({ ...book, [id]: value });
  };

  const handleSubmit = (e) => {
    bookFacade.editBook(book.id, book.info, book.title);
  };

  return (
    <div>
      <h2>Find a book</h2>

      <input
        id="book-id"
        placeholder="Enter book ID"
        onChange={(e) => {
          setBookId(e.target.value);
        }}
      />
      <button onClick={findBook}>Find book</button>

      {book && (
        <div>
          <p>Title: {book.title}</p>
          <p>Info: {book.info}</p>
          <p>ID: {book.id}</p>
          <div>
            <button onClick={() => deleteBook(book.id)}>Delete</button>
          </div>
          <div>
            <h2>EditBook</h2>
            <form>
              <input
                type="text"
                id="title"
                placeholder="Add Title"
                onChange={handleChange}
                value={book.title}
              ></input>
              <br />
              <input
                type="text"
                id="info"
                placeholder="Add Info"
                onChange={handleChange}
                value={book.info}
              ></input>
              <br />
              <button onSubmit={handleSubmit}>Edit</button>
            </form>
          </div>
        </div>
      )}
      {!book && <p>Enter a book id to find a book</p>}
    </div>
  );
}

function Details({ bookFacade }) {
  const { bookId } = useParams();
  const book = bookFacade.findBook(bookId);

  const showBook = book ? (
    <div>
      <h3>Book information:</h3>
      <p>Title: {book.title}</p>
      <p>ID: {book.id}</p>
      <p>Info: {book.info}</p>
    </div>
  ) : (
    <p>Book not found</p>
  );
  return <div>{showBook}</div>;
}

function Products({ bookFacade }) {
  const books = bookFacade.getBooks();
  let { path, url } = useRouteMatch();

  const list = books.map((book) => {
    return (
      <li key={book.id}>
        {book.title}
        &nbsp;
        <Link to={`${url}/${book.id}`}>details</Link>
      </li>
    );
  });
  return (
    <div>
      <h2>Products</h2>
      <ul>{list}</ul>
      <Switch>
        <Route exact path={path}>
          <h3>Select a book to get details</h3>
        </Route>
        <Route path={`${path}/:bookId`}>
          <Details bookFacade={bookFacade} />
        </Route>
      </Switch>
    </div>
  );
}

function Company() {
  return (
    <div>
      <h2>Company</h2>
    </div>
  );
}

function AddBook({ bookFacade }) {
  const emptyBook = { id: "", title: "" };
  const [book, setBook] = useState({ ...emptyBook });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBook({ ...book, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    bookFacade.addBook(book);
    setBook({ ...emptyBook });
  };

  return (
    <div>
      <h2>AddBook</h2>
      <form>
        <input
          type="text"
          id="title"
          placeholder="Add Title"
          onChange={handleChange}
          value={book.title}
        ></input>
        <br />
        <input
          type="text"
          id="info"
          placeholder="Add Info"
          onChange={handleChange}
          value={book.info}
        ></input>
        <br />
        <button onClick={handleSubmit}>Save</button>
      </form>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Could not find a match for you request</h2>
    </div>
  );
}

export default App;
