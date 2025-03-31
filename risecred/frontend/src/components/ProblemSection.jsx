import CountUp from "react-countup";
import { Card, CardContent, Typography } from "@mui/material";

const stats = [
  { title: "93% of India’s workforce is informal, with no legal protection or fair wages.", value: 93 },
  { title: "Only 10% of informal workers earn even the minimum wage.", value: 10 },
  { title: "Millions of dreams crushed beneath the weight of unpaid labor.", value: "Millions" },
];

const ProblemSection = () => {
  return (
    <div className="p-8 text-center">
      <h2 className="text-3xl font-bold text-gray-800">Invisible Hands Build Our Nation, Yet They Remain Unseen.</h2>
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4 shadow-lg w-64">
            <CardContent>
              <Typography variant="h3" className="text-blue-600 font-bold">
                {typeof stat.value === "number" ? <CountUp end={stat.value} duration={3} /> : stat.value}
              </Typography>
              <Typography variant="body1">{stat.title}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProblemSection;
