export default ({ status }) => {
  return (
    <div className="bg-gray-200 rounded-lg text-center p-4 hover:bg-white transition hover:shadow-md hover:shadow-black/25">
      <img src="/pizza.png" alt="pizza" />
      <h4 className="font-bold my-3 text-xl">Pepperoni Pizza</h4>
      <p className="text-gray-500 text-sm">
        LOREM IPSUM GENERATOR Lorem ipsum dolor sit
      </p>
      <button
        className="bg-primary text-white rounded-full px-8 py-2 mt-4"
        onClick={() => {
          {
            status == "authenticated"
              ? console.log("Here you go")
              : console.log("You need to login");
          }
        }}
      >
        Add to cart $12
      </button>
    </div>
  );
};
