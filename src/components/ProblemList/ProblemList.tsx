import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { databaseRef } from "@/Firebase";

// Define the type for the problem objects
type Problem = {
  id: string;
  Title: string;
  Statement:string,
  Level:string
};

const ProblemList = () => {
  const [problems, setProblems] = useState<Problem[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const prob = await getDocs(collection(databaseRef, "Problems"));
        const p = prob.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Problem[];
        setProblems(p);
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, []);

  return (
    <>
      <div className="flex justify-center ">
        <div className="w-full">
          <Table className="w-full">
            <TableCaption>List of hand-picked 30 problems to ace your coding interview</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead>Status</TableHead>

                <TableHead>Problem List</TableHead>
                <TableHead>Solution</TableHead>
                <TableHead className="text-right">Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {problems.map((prob, indx) => (
                <TableRow key={prob.id}>
                  <TableCell className="text-left">Day {indx + 1}</TableCell>
                  <TableCell className="text-left ">Not Solved</TableCell>

                  <TableCell className="text-left">{prob.Title}</TableCell>
                  <TableCell className="text-left">Get Solution</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={
                        prob.Level == "Easy"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      }
                    >
                      {prob.Level}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ProblemList;
