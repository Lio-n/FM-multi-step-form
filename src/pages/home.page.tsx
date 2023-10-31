import Title from "../ui/atoms/typographies/title.atom";

const HomePage = () => {
  return (
    <div className="text-green-300">
      <Title textColor="marine-blue">Home page</Title>
      <Title>Home page</Title>
      <button className="bg-lop hover:opacity-40">Hello world</button>
    </div>
  );
};

export default HomePage;
