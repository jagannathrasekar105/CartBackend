//what is clouser ?
//A clouser is a function that has access to the parent scope,even after the paren function has closed.

const e = require("cors");

// function Outer() {
//   let count = 0;
//   return function inner() {
//     count++;
//     return count;
//   };
// }

// const getCount = Outer();
// console.log(getCount());
// console.log(getCount());
// console.log(getCount());

//2)what is higher order components?
//A higher order components is a function that takes an argument as a component and return new inhanced component?

// function Hoc(WrappedComponent) {
//   return function (props) {
//     newMessage = `hello ${props.name}`;
//     return <WrappedComponent message={newMessage} {...props} />;
//   };
// }

// function GreetingComponent({ message }) {
//   return <h2>{message}</h2>;
// }

// const EnhancedGreeting = Hoc(GreetingComponent);
// // EnhancedGreeting({ name: "ruturaj" })
// <EnhancedGreeting name="ruturaj" />;

//what is the diff between let var and const ?
// var has function scope whereas let and const has block scope
// we can redeclare var in same scope but we can not declare the let in same scope and for const we can not ressign the value
// var is hoisted as   initialise with undefined  where as let and const hoisted but not initialse it cause reference and type error then gone to tdz
//temporal dead zone means time between  entering the  scope and the actual initialisation

//what is hoisting
// hoisting is the javascript behaviour moving the variable and function  declaration to the top of their scope during compile phase before code get executed
// where as function is fully hoisted

// what is hook?
// hooks is the function that we use state and other react feature in functional component

//what is controlled and uncontrooled component?
// controlled components means whose state value is my managed by react state and uncontrolled components means whose state value handle by DOM
// for example :-> forms elements like input textArea
// const [name, SetName] = useState("");
// const handleOnChange = (e) => {
//   SetName(e.target.value);
// };
// <input type="text" value={name} onChange={handleOnChange} />;

// //for uncontrolled component

// const nameRef=useRef();
// const value=nameRef.current.value

// <input type="text" ref={nameRef} />;

//what is async and await ?

// async is the keyword that we use to declare a function that will return a Promise.
// this function automatically wrapped the return value in a promise even if the return value is not explicitly promise

// and await is the keyword that we use inside the async function that will return a promise
// and promise is the object in javascript that represent the eventual complition or failure the asynchronous operation
// async and await is just syntactic sugar over promise
// const myPromise = new Promise((resolve, reject) => {
//   let success = true;
//   if (success) {
//     resolve("data fetch successfully");
//   } else {
//     reject("failed to fetch data");
//   }
// });

// myPromise
//   .then((result) => console.log(result))
//   .catch((error) => console.log(error));

// async function getData() {
//   const response = await fetch("url");
//   const result = await response.JSON();
//   console.log(result);
// }

// what is state and props?
// state is memory of components and where as props is read only data to the component

// what is spread and rest operator
// the spread operator we can use to spread the elements of an array or object into an individual elements
//we can use spread operator to copy array or object

//where as rest operator we can use to collect the individual  element to an single variable
//we use rest operator in function arguments

//what is deep and shallow copy
//shallow copy means only top level properties or elements are copied
//for ex:
// const original = [1, 2, 3, 4, [5, [6], 7], 8];
// const shallowCopy = [...original];
// shallowCopy[4][0] = 9;
// // its affect the original array also because spread operator copies only top level properties and nested array or object just shared the reference only
// const deepCopy = JSON.parse(JSON.stringify(original));
// import cloneDeep from "lodash/cloneDeep";
// const deepCopy1 = cloneDeep(original);
// original: [1, 2, 3, 4, [9, [6], 7], 8];
// shallowCopy: [1, 2, 3, 4, [9, [6], 7], 8];

// what is virtual dom
// virtual dom is the lightwieght copy of real dom when any stat of the components changes then react update the change on virtual dom and compare with prevous virtual dom using diffing algorithm and only the diffencence get added to real dom so that why improve  performance
// key are unique identifier uses in list to help react which item are remove updated or aded they improve rendering performance

//what is flexbox?
//flexbox is one diamensional layout sysytem in css used to arrage item in row or column

//it has properties like{display flex,flex-direction row or couln,flex-wrap,align-item center,justifycontent-center}

//grid is two diamensional layout sytem in css used to arrang item in row and column

//grid has property like{display-grid,grid-template-column,gap}

// what is fetch and what is axios
// fetch is in built method in javascript to make http request where as axios is third party library to make an http request axios automatically prase json and having built in support like interceptor,
// function fetchData() {
//   return axios
//     .get(url)
//     .then((response) => response.data)
//     .catch((error) => {
//       console.log(error);
//       throw error;
//     });
// }

// http error-->401 unauthorised
// 404-->url not found
// 500->internal server error

// const fetchData = async () => {
//   const url = "https://localhost/data";
//   const config = {
//     method: "get",
//     header: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer out token here",
//     },
//     body: { name: "hanuman", age: 30 },
//   };

//   try {
//     const response = await axios(url, config);
//     SetData(response.data);
//   } catch (error) {
//     throw new error();
//     console.log("failed to fetch data", error);
//   }
// };

// useEffect(() => {
//   fetchData();
// }, []);

// es6 feture
// 1)let and cost
// 2)module import export
// 3)default parameter
// 4)array or object destructuring
// 5)spread and rest operator
// 6)arrow function
// 7)template literal
// 8)map and Set
// 9)promises
// 10)obeject literals

// what is position in css?
// 1)static -->it doesnt depends on parents-->default behaviour
// 2)relative->does not depends on parent-->move relative to itself
// 3)absolut-->its depends on nearest ancestor-->means lookup for first parent with position fixed,relativ, abso,
// 4)fixed-->it doenot depends on parent-->always relative ot broser window
// 5)sticky-->depends on parent means scollable ancestor-->need a scrollable parents

//what is custom hook in react?
// a custom hook in a react is reusable function thats start with use and allow us to encapsulate the logic using built in hook like useState,useEffect or useContext

// function useCounter() {
//   const [count, setCount] = useState(0);
//   const increment = () => setCount((count) => count + 1);
//   const decremnt = () => setCount((count) => count - 1);

//   return { count, increment, decremnt };
// }
// export default useCounter;

// function counterComponent() {
//   const { count, increment, decremnt } = useCounter;

//   return (
//     <>
//       <button onClick={increment}>increment</button>
//       <h1>count:{count}</h1>
//       <button onClick={decremnt}>decrement</button>
//     </>
//   );
// }

//what is react routing?
//routing in react refer to process of navigating different component in a single page application without reloading the entire page this is achieve by using react router dom library

// const name = "jagannath";

// const obj = name.split("").reduce((acc, cur) => {
//   acc[cur] = (acc[cur] || 0) + 1;
//   return acc;
// }, {});
// console.log(obj);

// const name = "jagannath rasekar";

// const reversed = name
//   .split(" ")
//   .map((x) => x.split("").reverse().join(""))
//   .join(" ");
// console.log(reversed);

// const arr = ["sagar", "magar", "nagar", "Pagar", "badal"];
// query = "sa";

// search = arr.filter((x) => x.toLowerCase().includes(query.toLowerCase()));
// console.log(search);

// for max num in Array
// Math.max(...arr);

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// function secondMax(arr) {
//   let first = Infinity;
//   let second = Infinity;

//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] < first) {
//       second = first;
//       first = arr[i];
//     } else if (arr[i] < second && arr[i] !== first) {
//       second = arr[i];
//     }
//   }
//   return second === Infinity ? null : second;
// }
// console.log(secondMax([1, 2, 2, 3, 3, 4, 5]));

//what is jsx?
//jsx is javascript xml that means wwe can write html like code in javascript code
//what is babel?
//babel is transpiler that transform jsx code into pure javascript code
