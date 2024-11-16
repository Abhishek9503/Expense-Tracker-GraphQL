import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";

const Cards = ({authUser}) => {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);
  if (error) return <p>Error ...{error.message}</p>;
  if (loading) return <p>Loading...</p>;

  //TODO => ADD RELATIONSHIPS
  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10">History</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {!loading &&
          data.transactions.map((transaction) => (
            <Card key={transaction.id} transaction={transaction} authUser={authUser} />
          ))}
      </div>

      {!loading && data.transactions.length === 0 && (
        <p className="text-center  text-red-300 text-2xl">No transactions history found.</p>
      )}
    </div>
  );
};
export default Cards;
