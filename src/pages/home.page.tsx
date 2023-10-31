import Button from "../ui/atoms/button.atom";
import Title from "../ui/atoms/typographies/title.atom";

const HomePage = () => {
  return (
    <div className="text-green-300">
      <Title textColor="marine-blue">Home page</Title>
      <Title>Home page</Title>
      <button className="bg-lop hover:opacity-40">Hello world</button>
      <Button bgColor="transparent">Next Step</Button>
      <Button bgColor={"purplish-blue"}>Confirm</Button>
      <Button bgColor={"strawberry-red"} textColor="purplish-blue">
        Hello world
      </Button>
    </div>
  );
};

export default HomePage;
