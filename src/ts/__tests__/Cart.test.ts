import Cart from "../service/Cart";
import Book from "../domain/Book";
import MusicAlbum from "../domain/MusicAlbum";
import Movie from "../domain/Movie";

test('new card should be empty', () => {
  const cart = new Cart();

  expect(cart.items.length).toBe(0);
});

test("testing adding an item to the shopping cart", () => {
  const cart = new Cart();
  cart.add(new Book(1001, "War and Piece", "Leo Tolstoy", 2000, 1225));
  const expectedResult = {
    id: 1001,
    name: "War and Piece", 
    author: "Leo Tolstoy",
    price: 2000,
    pages: 1225
  } 

  expect(cart.items[0]).toEqual(expectedResult);
});

test("testing the calculation of the purchase amount", () => {
  const cart = new Cart();
  cart.add(new Book(1001, "War and Piece", "Leo Tolstoy", 2000, 1225));
  cart.add(new Book(1106, "Harry Potter and the Philosopher's Stone", "J.K. ROWLING", 847, 432));
  cart.add(new MusicAlbum(3008, "Meteora", "Linkin Park", 900));
  cart.add(new Movie(2051, "Мстители", "The Avengers", 2399, 2012, "США", "«Avengers Assemble!»", 
  ["фантастика", "боевик", "фэнтези", "приключения"], "137 мин. / 02:17"));

  expect(cart.calculateAmount()).toBe(6146);
});

test("testing the calculation of the purchase amount taking into account the discount", () => {
  const cart = new Cart();
  cart.add(new Book(1001, "War and Piece", "Leo Tolstoy", 2000, 1225));
  cart.add(new Book(1106, "Harry Potter and the Philosopher's Stone", "J.K. ROWLING", 847, 432));
  cart.add(new MusicAlbum(3008, "Meteora", "Linkin Park", 900));
  cart.add(new Movie(2051, "Мстители", "The Avengers", 2399, 2012, "США", "«Avengers Assemble!»", 
  ["фантастика", "боевик", "фэнтези", "приключения"], "137 мин. / 02:17"));

  expect(cart.calculateAmountAfterDiscount(0.15)).toBe(5224.1);
});

test("testing the calculation of the purchase amount taking into account the discount", () => {
  const cart = new Cart();
  cart.add(new Book(1001, "War and Piece", "Leo Tolstoy", 2000, 1225));
  cart.add(new Book(1106, "Harry Potter and the Philosopher's Stone", "J.K. ROWLING", 847, 432));
  cart.add(new MusicAlbum(3008, "Meteora", "Linkin Park", 900));
  cart.removeProduct(1106);
    const expectedResult = [
      {
        id: 1001,
        name: "War and Piece", 
        author: "Leo Tolstoy",
        price: 2000,
        pages: 1225
      },
      {
        id: 3008,
        name: "Meteora", 
        author: "Linkin Park",
        price: 900
      },
    ]

  expect(cart.items).toEqual(expectedResult);
});