import { useDispatch, useSelector } from "react-redux";
import Conversation from "./Conversation";

const Conversations = () => {
  const dispatch = useDispatch();
  const { conversations } = useSelector((state) => state.chat);

  return (
    <div className="convos scrollbar">
      <ul>
        {conversations &&
          conversations.map((convo) => {
            return <Conversation convo={convo} key={convo._id} />;
          })}
      </ul>
    </div>
  );
};

export default Conversations;
