const Categories = ({ categories }) => {
  <div key={categories.names}>
    <span>{categories.name}</span>
    <span>{categories.meals}</span>
  </div>;
};

export default Categories;
