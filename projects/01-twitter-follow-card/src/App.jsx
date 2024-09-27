import "./App.css";
import { TwitterFollowCard } from "./TwitterFollowCard";

export default function App() {
  const users = [
    {
      userName: "midudev",
      name: "Miguel Ángel Durán",
      isFollowing: true,
    },
    {
      userName: "pheralb",
      name: "Pablo H.",
      isFollowing: false,
    },
    {
      userName: "PacoHdezs",
      name: "Paco Hdez",
      isFollowing: true,
    },
    {
      userName: "TMChein",
      name: "Tomas",
      isFollowing: false,
    },
  ];

  return (
    <section className="App">
      {users.map((user) => (
        <TwitterFollowCard
          key={user.userName}
          username={user.userName}
          name={user.name}
          isFollowing={user.isFollowing}
        >
          {user.name}
        </TwitterFollowCard>
      ))}
    </section>
  );
}
